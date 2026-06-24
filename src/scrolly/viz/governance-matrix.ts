// @ts-nocheck
/**
 * Human–AI responsibility quadrant matrix.
 */
type GovMatrixArgs = {
  mountEl: SVGSVGElement
  props?: {
    points?: Array<{ label: string; x: number; y: number; zone?: string }>
    xLabel?: string
    yLabel?: string
  }
}

export default function renderGovernanceMatrix({ mountEl, props }: GovMatrixArgs) {
  const d3 = (globalThis as any).d3
  if (!d3) return

  mountEl.replaceChildren()
  const W = 600
  const H = 400
  const M = { top: 48, right: 32, bottom: 48, left: 56 }
  const iW = W - M.left - M.right
  const iH = H - M.top - M.bottom

  const s = getComputedStyle(document.body)
  const ink = s.getPropertyValue('--ink').trim() || '#F4F7FB'
  const muted = s.getPropertyValue('--ink-muted').trim() || '#91A4B7'
  const accent = s.getPropertyValue('--accent-blue').trim() || '#5EEAD4'
  const border = s.getPropertyValue('--border').trim() || 'rgba(255,255,255,0.12)'

  const zoneColors: Record<string, string> = {
    automate: '#34D399',
    review: '#5EEAD4',
    support: '#60A5FA',
    human: '#FBBF24',
  }

  const points = props?.points || [
    { label: 'Schema validation', x: 0.15, y: 0.2, zone: 'automate' },
    { label: 'Req extraction', x: 0.25, y: 0.35, zone: 'review' },
    { label: 'Guideline draft', x: 0.45, y: 0.3, zone: 'review' },
    { label: 'Trainer Q&A', x: 0.35, y: 0.55, zone: 'support' },
    { label: 'Scope negotiation', x: 0.75, y: 0.7, zone: 'human' },
    { label: 'Final delivery', x: 0.85, y: 0.85, zone: 'human' },
  ]

  const svg = d3.select(mountEl).attr('viewBox', `0 0 ${W} ${H}`)
  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`)

  // quadrant backgrounds
  const quads = [
    { x: 0, y: 0, w: 0.5, h: 0.5, fill: zoneColors.automate, label: 'Automate + monitor' },
    { x: 0.5, y: 0, w: 0.5, h: 0.5, fill: zoneColors.review, label: 'AI draft → human review' },
    { x: 0, y: 0.5, w: 0.5, h: 0.5, fill: zoneColors.support, label: 'Human-led + AI support' },
    { x: 0.5, y: 0.5, w: 0.5, h: 0.5, fill: zoneColors.human, label: 'Human-owned' },
  ]

  quads.forEach((q) => {
    g.append('rect')
      .attr('x', q.x * iW).attr('y', q.y * iH)
      .attr('width', q.w * iW).attr('height', q.h * iH)
      .attr('fill', q.fill).attr('opacity', 0.12)
      .attr('stroke', border).attr('stroke-width', 1)
    g.append('text')
      .attr('x', q.x * iW + 8).attr('y', q.y * iH + 14)
      .attr('fill', muted).style('font-size', '7px').style('font-family', 'Inter,sans-serif')
      .text(q.label)
  })

  // axes
  g.append('line').attr('x1', 0).attr('y1', iH).attr('x2', iW).attr('y2', iH).attr('stroke', border)
  g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', iH).attr('stroke', border)

  svg.append('text')
    .attr('x', M.left + iW / 2).attr('y', H - 12)
    .attr('text-anchor', 'middle').attr('fill', muted)
    .style('font-size', '9px').style('font-family', 'Inter,sans-serif')
    .text(props?.xLabel || 'Low consequence → High consequence')

  svg.append('text')
    .attr('x', 14).attr('y', M.top + iH / 2)
    .attr('fill', muted).style('font-size', '9px').style('font-family', 'Inter,sans-serif')
    .attr('transform', `rotate(-90, 14, ${M.top + iH / 2})`)
    .attr('text-anchor', 'middle')
    .text(props?.yLabel || 'Structured → Ambiguous')

  points.forEach((pt, i) => {
    const px = pt.x * iW
    const py = (1 - pt.y) * iH
    const color = zoneColors[pt.zone || 'review'] || accent
    const ng = g.append('g').attr('opacity', 0)
    ng.append('circle').attr('cx', px).attr('cy', py).attr('r', 8).attr('fill', color)
    ng.append('text')
      .attr('x', px + 12).attr('y', py + 4)
      .attr('fill', ink).style('font-size', '8px').style('font-weight', '600')
      .style('font-family', 'Inter,sans-serif')
      .text(pt.label)
    ng.transition().delay(i * 100 + 200).duration(400).attr('opacity', 1)
  })
}
