// @ts-nocheck
/**
 * Animated flow / network diagrams for delivery-intelligence articles.
 * Rect nodes, curved paths, arrow markers, moving data packets.
 */
type FlowNode = {
  id: string
  label: string
  x: number
  y: number
  w?: number
  h?: number
  color?: string
  r?: number
  shape?: 'rect' | 'circle'
}

type FlowLink = {
  from: string
  to: string
  sig?: boolean
  dashed?: boolean
  animate?: boolean
  label?: string
}

type FlowStage = {
  label: string
  artifacts?: string[]
}

type FlowArgs = {
  mountEl: SVGSVGElement
  panelEl?: HTMLElement
  props?: {
    variant?: string
    nodes?: FlowNode[]
    links?: FlowLink[]
    stages?: FlowStage[]
    layers?: string[]
    layerColors?: string[]
  }
}

function theme() {
  const s = getComputedStyle(document.body)
  return {
    paper: s.getPropertyValue('--paper').trim() || '#07111F',
    ink: s.getPropertyValue('--ink').trim() || '#F4F7FB',
    muted: s.getPropertyValue('--ink-muted').trim() || '#91A4B7',
    accent: s.getPropertyValue('--accent-blue').trim() || '#5EEAD4',
    secondary: s.getPropertyValue('--political-red').trim() || '#60A5FA',
    border: s.getPropertyValue('--border').trim() || 'rgba(255,255,255,0.12)',
    violet: '#A78BFA',
    amber: '#FBBF24',
    coral: '#FB7185',
    green: '#34D399',
  }
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function renderDeliveryFlow({ mountEl, props }: FlowArgs) {
  const d3 = (globalThis as any).d3
  if (!d3) return

  mountEl.replaceChildren()
  const c = theme()
  const W = 600
  const H = 400
  const variant = props?.variant || 'pipeline'
  const animate = !reducedMotion()

  const svg = d3.select(mountEl).attr('viewBox', `0 0 ${W} ${H}`)

  const defs = svg.append('defs')
  ;['flow', 'flow-dashed'].forEach((id) => {
    defs
      .append('marker')
      .attr('id', `arrow-${id}`)
      .attr('viewBox', '0 -4 8 8')
      .attr('refX', 7)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L8,0L0,4')
      .attr('fill', id === 'flow' ? c.accent : c.muted)
  })

  const g = svg.append('g')

  // background grid
  for (let x = 0; x <= W; x += 40) {
    g.append('line')
      .attr('x1', x).attr('y1', 0).attr('x2', x).attr('y2', H)
      .attr('stroke', c.border).attr('stroke-width', 0.5).attr('opacity', 0.4)
  }
  for (let y = 0; y <= H; y += 40) {
    g.append('line')
      .attr('x1', 0).attr('y1', y).attr('x2', W).attr('y2', y)
      .attr('stroke', c.border).attr('stroke-width', 0.5).attr('opacity', 0.4)
  }

  const nodeMap = new Map<string, FlowNode & { cx: number; cy: number }>()

  function registerNode(n: FlowNode) {
    const w = n.w ?? (n.shape === 'circle' ? (n.r ?? 28) * 2 : 88)
    const h = n.h ?? (n.shape === 'circle' ? (n.r ?? 28) * 2 : 36)
    const cx = n.shape === 'circle' ? n.x : n.x + w / 2
    const cy = n.shape === 'circle' ? n.y : n.y + h / 2
    nodeMap.set(n.id, { ...n, w, h, cx, cy })
  }

  function drawNode(n: FlowNode, delay = 0) {
    registerNode(n)
    const color = n.color || c.secondary
    const ng = g.append('g').attr('opacity', animate ? 0 : 1)

    if (n.shape === 'circle' || n.r) {
      const r = n.r ?? 28
      ng.append('circle')
        .attr('cx', n.x).attr('cy', n.y).attr('r', animate ? 0 : r)
        .attr('fill', color)
        .attr('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.35)')
        .transition?.().delay(delay).duration(500).attr('r', r)
    } else {
      const w = n.w ?? 88
      const h = n.h ?? 36
      ng.append('rect')
        .attr('x', n.x).attr('y', n.y).attr('width', w).attr('height', h)
        .attr('rx', 8).attr('fill', color)
        .attr('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.35)')
        .attr('opacity', animate ? 0 : 1)
        .transition?.().delay(delay).duration(400).attr('opacity', 1)
    }

    const tx = n.shape === 'circle' || n.r ? n.x : n.x + (n.w ?? 88) / 2
    const ty = n.shape === 'circle' || n.r ? n.y : n.y + (n.h ?? 36) / 2
    ng.selectAll('text')
      .data(n.label.split('\n'))
      .join('text')
      .attr('x', tx)
      .attr('y', (_: string, j: number, arr: string[]) => ty + (j - (arr.length - 1) / 2) * 13)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#07111F')
      .style('font-family', 'Inter,sans-serif')
      .style('font-size', '10px')
      .style('font-weight', '600')
      .text((d: string) => d)

    if (animate) ng.transition().delay(delay).duration(400).attr('opacity', 1)
  }

  function edgePoint(from: FlowNode & { cx: number; cy: number }, to: FlowNode & { cx: number; cy: number }, side: 'from' | 'to') {
    const dx = to.cx - from.cx
    const dy = to.cy - from.cy
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const node = side === 'from' ? from : to
    const pad = node.shape === 'circle' || node.r ? (node.r ?? 28) + 4 : (side === 'from' ? 4 : -4)
    const ox = side === 'from' ? node.cx + ux * pad : node.cx - ux * ((node.w ?? 88) / 2 + 4)
    const oy = side === 'from' ? node.cy + uy * pad : node.cy - uy * ((node.h ?? 36) / 2 + 4)
    if (node.shape === 'circle' || node.r) {
      return { x: side === 'from' ? node.cx + ux * pad : node.cx - ux * pad, y: side === 'from' ? node.cy + uy * pad : node.cy - uy * pad }
    }
    return { x: ox, y: oy }
  }

  function drawLink(link: FlowLink, i: number) {
    const from = nodeMap.get(link.from)
    const to = nodeMap.get(link.to)
    if (!from || !to) return

    const p1 = edgePoint(from, to, 'from')
    const p2 = edgePoint(to, from, 'to')
    const mx = (p1.x + p2.x) / 2
    const my = (p1.y + p2.y) / 2
    const d = `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`

    const path = g.append('path')
      .attr('d', d)
      .attr('fill', 'none')
      .attr('stroke', link.sig === false ? c.muted : c.accent)
      .attr('stroke-width', link.sig === false ? 1.5 : 2.2)
      .attr('stroke-dasharray', link.dashed ? '6 4' : 'none')
      .attr('marker-end', `url(#arrow-${link.dashed ? 'flow-dashed' : 'flow'})`)
      .attr('opacity', animate ? 0 : 0.65)

    if (animate) {
      path.transition().delay(i * 100 + 300).duration(600).attr('opacity', 0.65)
      if (link.animate !== false) {
        const pathNode = path.node() as SVGPathElement
        const packet = g.append('circle')
          .attr('r', 4)
          .attr('fill', c.amber)
          .attr('opacity', 0.9)
        const total = pathNode.getTotalLength()
        function movePacket(t: number) {
          const p = pathNode.getPointAtLength(t * total)
          packet.attr('cx', p.x).attr('cy', p.y)
        }
        movePacket(0)
        const loop = () => {
          packet
            .transition()
            .duration(2200)
            .ease(d3.easeLinear)
            .tween('path', () => (t: number) => movePacket(t))
            .on('end', loop)
        }
        setTimeout(loop, i * 100 + 900)
      }
    }

    if (link.label) {
      g.append('text')
        .attr('x', mx).attr('y', my - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', c.muted)
        .style('font-size', '8px')
        .style('font-family', 'Inter,sans-serif')
        .text(link.label)
    }
  }

  function drawLifecycle(stages: FlowStage[]) {
    const step = (W - 80) / stages.length
    const y = H * 0.38
    stages.forEach((st, i) => {
      const x = 40 + step * i + step / 2 - 44
      drawNode({ id: `s${i}`, label: st.label, x, y: y - 18, color: i === stages.length - 1 ? c.violet : c.secondary }, i * 100)
      if (i > 0) drawLink({ from: `s${i - 1}`, to: `s${i}`, animate: true }, i)
      ;(st.artifacts || []).slice(0, 3).forEach((art, j) => {
        g.append('text')
          .attr('x', x + 44).attr('y', y + 36 + j * 13)
          .attr('text-anchor', 'middle')
          .attr('fill', c.muted)
          .style('font-size', '8px')
          .style('font-family', 'Inter,sans-serif')
          .text(art)
      })
    })
    if (stages.length > 2) {
      const x0 = 40 + step / 2
      const xN = 40 + step * (stages.length - 1) + step / 2
      g.append('path')
        .attr('d', `M ${xN} ${y + 58} Q ${W / 2} ${H - 28} ${x0} ${y + 58}`)
        .attr('fill', 'none')
        .attr('stroke', c.amber)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5 4')
        .attr('marker-end', 'url(#arrow-flow-dashed)')
        .attr('opacity', 0.7)
      g.append('text').attr('x', W / 2).attr('y', H - 10).attr('text-anchor', 'middle')
        .attr('fill', c.muted).style('font-size', '9px').text('iterate on requirements')
    }
  }

  function drawPipeline(labels: string[]) {
    const step = (W - 60) / labels.length
    const y = H / 2 - 18
    labels.forEach((label, i) => {
      const x = 30 + step * i + step / 2 - 40
      const isEnd = i === labels.length - 1
      drawNode({ id: `p${i}`, label, x, y, color: isEnd ? c.violet : c.secondary, w: 78 }, i * 80)
      if (i > 0) drawLink({ from: `p${i - 1}`, to: `p${i}`, animate: true }, i)
    })
  }

  function drawLayers(layers: string[], colors?: string[]) {
    const palette = colors || [c.muted, c.secondary, c.accent, c.violet, c.amber, c.green]
    layers.forEach((layer, i) => {
      const inset = i * 18
      const rect = g.append('rect')
        .attr('x', 50 + inset).attr('y', 45 + inset)
        .attr('width', W - 100 - inset * 2).attr('height', H - 90 - inset * 2)
        .attr('rx', 10)
        .attr('fill', 'none')
        .attr('stroke', palette[i % palette.length])
        .attr('stroke-width', 1.8)
        .attr('opacity', animate ? 0 : 0.85)
      if (animate) rect.transition().delay(i * 120).duration(500).attr('opacity', 0.85)
      g.append('text')
        .attr('x', 62 + inset).attr('y', 62 + inset)
        .attr('fill', c.ink)
        .style('font-size', '9px')
        .style('font-weight', '600')
        .style('font-family', 'Inter,sans-serif')
        .text(layer)
    })
  }

  // ── Variants ──────────────────────────────────────────────────────────────

  if (variant === 'lifecycle' && props?.stages) {
    drawLifecycle(props.stages)
    return
  }

  if (variant === 'pipeline') {
    drawPipeline(['Ingest', 'Parse', 'Classify', 'Extract', 'Link', 'Approve', 'Store'])
    return
  }

  if (variant === 'layers' && props?.layers) {
    drawLayers(props.layers, props.layerColors)
    return
  }

  if (variant === 'network' && props?.nodes && props?.links) {
    props.nodes.forEach((n, i) => drawNode({ ...n, shape: n.r ? 'circle' : 'rect', x: n.r ? n.x : n.x - (n.w ?? 88) / 2, y: n.r ? n.y : n.y - (n.h ?? 36) / 2 }, i * 70))
    props.links.forEach((l, i) => drawLink({ ...l, animate: !l.dashed }, i))
    return
  }

  if (variant === 'flywheel') {
    const cx = W / 2
    const cy = H / 2
    drawNode({ id: 'core', label: 'Delivery\nIntelligence', x: cx, y: cy, r: 42, color: c.violet, shape: 'circle' })
    const steps = ['Execute', 'Capture', 'Evaluate', 'Extract', 'Improve', 'Launch']
    steps.forEach((s, i) => {
      const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2
      drawNode({ id: `f${i}`, label: s, x: cx + Math.cos(a) * 130, y: cy + Math.sin(a) * 95, r: 24, color: c.accent, shape: 'circle' }, i * 90)
      drawLink({ from: 'core', to: `f${i}`, dashed: false, animate: true }, i)
      if (i > 0) drawLink({ from: `f${i - 1}`, to: `f${i}`, dashed: true, animate: true }, i + 6)
    })
    drawLink({ from: `f${steps.length - 1}`, to: 'f0', dashed: true, animate: true }, 12)
    return
  }

  if (variant === 'architecture') {
    const labels = ['Inputs', 'Collection', 'Knowledge', 'Skills', 'Production', 'Delivery', 'Learning']
    drawPipeline(labels)
    const x0 = 30 + (W - 60) / labels.length / 2
    const xN = W - 30 - (W - 60) / labels.length / 2
    g.append('path')
      .attr('d', `M ${xN} ${H / 2 + 40} Q ${W / 2} ${H - 24} ${x0} ${H / 2 + 40}`)
      .attr('fill', 'none').attr('stroke', c.amber).attr('stroke-width', 2)
      .attr('stroke-dasharray', '6 4').attr('marker-end', 'url(#arrow-flow)')
    return
  }

  if (variant === 'impact' && props?.nodes && props?.links) {
    props.nodes.forEach((n, i) => {
      const isCenter = n.id === 'rule' || n.id === 'center'
      drawNode({
        ...n,
        shape: isCenter ? 'circle' : 'rect',
        x: n.r ? n.x : n.x - (n.w ?? 80) / 2,
        y: n.r ? n.y : n.y - (n.h ?? 32) / 2,
        w: n.w ?? 80,
        h: n.h ?? 32,
        color: n.color || (isCenter ? c.amber : c.secondary),
      }, i * 60)
    })
    props.links.forEach((l, i) => drawLink({ ...l, animate: true, sig: true }, i))
    return
  }

  // default pipeline
  drawPipeline(['Source', 'Process', 'Store'])
}
