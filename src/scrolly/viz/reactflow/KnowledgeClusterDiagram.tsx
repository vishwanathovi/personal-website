import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  KNOWLEDGE_CLUSTERS,
  KNOWLEDGE_HUB,
  type ClusterTheme,
  type KnowledgeCluster,
} from './flow-theme'

type Point = { x: number; y: number }

type MeasuredLink = {
  clusterId: string
  from: Point
  to: Point
}

function rectCenter(rect: DOMRect, board: DOMRect): Point {
  return {
    x: rect.left - board.left + rect.width / 2,
    y: rect.top - board.top + rect.height / 2,
  }
}

function edgePointToward(rect: DOMRect, board: DOMRect, target: Point): Point {
  const cx = rect.left - board.left + rect.width / 2
  const cy = rect.top - board.top + rect.height / 2
  const dx = target.x - cx
  const dy = target.y - cy

  if (dx === 0 && dy === 0) {
    return { x: cx, y: cy }
  }

  const hw = rect.width / 2
  const hh = rect.height / 2

  // Snap near-axis rays so vertical/horizontal links hit true edge midpoints
  if (Math.abs(dx) < 1) {
    return { x: cx, y: dy > 0 ? cy + hh : cy - hh }
  }
  if (Math.abs(dy) < 1) {
    return { x: dx > 0 ? cx + hw : cx - hw, y: cy }
  }

  const scaleX = hw / Math.abs(dx)
  const scaleY = hh / Math.abs(dy)
  const t = Math.min(scaleX, scaleY)

  return {
    x: cx + dx * t,
    y: cy + dy * t,
  }
}

function measureLinks(
  board: HTMLElement,
  hubEl: HTMLElement,
  clusterEls: Map<string, HTMLElement>,
): MeasuredLink[] {
  const boardRect = board.getBoundingClientRect()
  const hubRect = hubEl.getBoundingClientRect()
  const hubCenter = rectCenter(hubRect, boardRect)

  return KNOWLEDGE_CLUSTERS.flatMap((cluster) => {
    const el = clusterEls.get(cluster.id)
    if (!el) return []

    const clusterRect = el.getBoundingClientRect()
    const clusterCenter = rectCenter(clusterRect, boardRect)

    return [
      {
        clusterId: cluster.id,
        from: edgePointToward(clusterRect, boardRect, hubCenter),
        to: edgePointToward(hubRect, boardRect, clusterCenter),
      },
    ]
  })
}

function ClusterNode({ label, theme, hero }: { label: string; theme: ClusterTheme; hero?: boolean }) {
  return (
    <div
      className={[
        'dl-block',
        'dl-block--compact',
        hero ? 'dl-block--hero' : `dl-block--${theme}`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="dl-block-label">{label}</span>
    </div>
  )
}

function ClusterCard({
  cluster,
  registerRef,
}: {
  cluster: KnowledgeCluster
  registerRef: (id: string, el: HTMLElement | null) => void
}) {
  const isOutputs = cluster.id === 'outputs'

  return (
    <section
      ref={(el) => registerRef(cluster.id, el)}
      className={`dl-lane dl-cluster dl-cluster--${cluster.theme}`}
      style={{ gridColumn: cluster.grid.col, gridRow: cluster.grid.row }}
    >
      <h3 className="dl-lane-title">{cluster.title}</h3>
      <div className="dl-cluster-nodes">
        {cluster.nodes.map((node) => (
          <ClusterNode key={node.id} label={node.label} theme={cluster.theme} hero={isOutputs} />
        ))}
      </div>
    </section>
  )
}

function HubLinks({ links, width, height }: { links: MeasuredLink[]; width: number; height: number }) {
  if (width <= 0 || height <= 0 || links.length === 0) return null

  return (
    <svg
      className="dl-cluster-links"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        {links.map((link, i) => (
          <linearGradient
            key={link.clusterId}
            id={`dl-link-grad-${i}`}
            gradientUnits="userSpaceOnUse"
            x1={link.from.x}
            y1={link.from.y}
            x2={link.to.x}
            y2={link.to.y}
          >
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.45" />
          </linearGradient>
        ))}
      </defs>
      {links.map((link, i) => (
        <g key={link.clusterId}>
          <path
            d={`M ${link.from.x} ${link.from.y} L ${link.to.x} ${link.to.y}`}
            fill="none"
            stroke={`url(#dl-link-grad-${i})`}
            strokeWidth="1.75"
            strokeDasharray="5 3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.95"
          />
          <circle r="2.5" fill="#5EEAD4" opacity="0.95">
            <animateMotion
              dur={`${4 + i * 0.35}s`}
              repeatCount="indefinite"
              path={`M ${link.from.x} ${link.from.y} L ${link.to.x} ${link.to.y}`}
            />
          </circle>
        </g>
      ))}
    </svg>
  )
}

export function KnowledgeClusterDiagram() {
  const boardRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const clusterRefs = useRef(new Map<string, HTMLElement>())
  const [links, setLinks] = useState<MeasuredLink[]>([])
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 })

  const registerClusterRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) clusterRefs.current.set(id, el)
    else clusterRefs.current.delete(id)
  }, [])

  const updateLinks = useCallback(() => {
    const board = boardRef.current
    const hub = hubRef.current
    if (!board || !hub) return

    const rect = board.getBoundingClientRect()
    setBoardSize({ w: rect.width, h: rect.height })
    setLinks(measureLinks(board, hub, clusterRefs.current))
  }, [])

  useLayoutEffect(() => {
    updateLinks()

    const board = boardRef.current
    if (!board) return

    const observer = new ResizeObserver(updateLinks)
    observer.observe(board)

    window.addEventListener('resize', updateLinks)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateLinks)
    }
  }, [updateLinks])

  return (
    <div className="dl-viz dl-viz--clusters">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-cluster-board" ref={boardRef}>
        {KNOWLEDGE_CLUSTERS.map((cluster) => (
          <ClusterCard key={cluster.id} cluster={cluster} registerRef={registerClusterRef} />
        ))}
        <div className="dl-cluster-hub" style={{ gridColumn: 2, gridRow: 2 }}>
          <div ref={hubRef} className="dl-block dl-block--hub">
            <span className="dl-block-label">{KNOWLEDGE_HUB.label}</span>
          </div>
        </div>
        <HubLinks links={links} width={boardSize.w} height={boardSize.h} />
      </div>
    </div>
  )
}
