import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  KNOWLEDGE_STORE,
  PIPELINE_SOURCES,
  PIPELINE_STAGES,
  PIPELINE_STORAGE,
  PIPELINE_STORAGE_NOTE,
  SOURCE_ICON_COLORS,
  type PipelineSource,
  type PipelineSourceIcon,
} from './flow-theme'

type Point = { x: number; y: number }

type FlowPath = {
  id: string
  d: string
  color: string
  dur: number
  delay: number
}

const STORE_FLOW_COLOR = '#A78BFA'

function SourceIcon({ icon }: { icon: PipelineSourceIcon }) {
  const props = {
    className: 'dl-block-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
  }

  switch (icon) {
    case 'doc':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'call':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.11a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'message':
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'sample':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'tracker':
      return (
        <svg {...props}>
          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 16l4-5 4 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'code':
      return (
        <svg {...props}>
          <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'decision':
      return (
        <svg {...props}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function rectCenter(rect: DOMRect, board: DOMRect): Point {
  return {
    x: rect.left - board.left + rect.width / 2,
    y: rect.top - board.top + rect.height / 2,
  }
}

function isHorizontalGutter(leftCol: DOMRect, gutter: DOMRect, rightCol: DOMRect) {
  return gutter.width > 8 && gutter.left >= leftCol.right - 4 && gutter.right <= rightCol.left + 4
}

function addGutterFlows(
  paths: FlowPath[],
  boardRect: DOMRect,
  leftColRect: DOMRect,
  gutterRect: DOMRect,
  rightColRect: DOMRect,
  rowEls: HTMLElement[],
  prefix: string,
  color: string,
  baseDelay: number,
) {
  if (!isHorizontalGutter(leftColRect, gutterRect, rightColRect)) return

  const fromX = leftColRect.right - boardRect.left + 1
  const toX = gutterRect.right - boardRect.left - 1

  rowEls.forEach((el, i) => {
    const y = rectCenter(el.getBoundingClientRect(), boardRect).y
    paths.push({
      id: `${prefix}-${i}`,
      d: `M ${fromX} ${y} L ${toX} ${y}`,
      color,
      dur: 4 + i * 0.35,
      delay: baseDelay + i * 0.45,
    })
  })
}

function measurePaths(
  board: HTMLElement,
  sourcesColEl: HTMLElement | null,
  sourcesGutterEl: HTMLElement | null,
  storageColEl: HTMLElement | null,
  storageGutterEl: HTMLElement | null,
  stagesColEl: HTMLElement | null,
  storeGutterEl: HTMLElement | null,
  storeColEl: HTMLElement | null,
  sourceEls: Map<string, HTMLElement>,
  stageEls: HTMLElement[],
  storeCompEls: HTMLElement[],
): FlowPath[] {
  const boardRect = board.getBoundingClientRect()
  const paths: FlowPath[] = []

  if (sourcesColEl && storageColEl && sourcesGutterEl) {
    const sourcesRect = sourcesColEl.getBoundingClientRect()
    const storageRect = storageColEl.getBoundingClientRect()
    const gutterRect = sourcesGutterEl.getBoundingClientRect()

    if (isHorizontalGutter(sourcesRect, gutterRect, storageRect)) {
      const fromX = sourcesRect.right - boardRect.left + 1
      const toX = gutterRect.right - boardRect.left - 1

      PIPELINE_SOURCES.forEach((source, i) => {
        const el = sourceEls.get(source.id)
        if (!el) return
        const y = rectCenter(el.getBoundingClientRect(), boardRect).y

        paths.push({
          id: `src-${source.id}`,
          d: `M ${fromX} ${y} L ${toX} ${y}`,
          color: SOURCE_ICON_COLORS[source.icon],
          dur: 4 + i * 0.35,
          delay: i * 0.45,
        })
      })
    }
  }

  if (storageColEl && stagesColEl && storageGutterEl && stageEls.length > 0) {
    addGutterFlows(
      paths,
      boardRect,
      storageColEl.getBoundingClientRect(),
      storageGutterEl.getBoundingClientRect(),
      stagesColEl.getBoundingClientRect(),
      stageEls,
      'storage-stage',
      '#FBBF24',
      0.5,
    )
  }

  if (stagesColEl && storeColEl && storeGutterEl && storeCompEls.length > 0) {
    addGutterFlows(
      paths,
      boardRect,
      stagesColEl.getBoundingClientRect(),
      storeGutterEl.getBoundingClientRect(),
      storeColEl.getBoundingClientRect(),
      storeCompEls,
      'stage-store',
      STORE_FLOW_COLOR,
      1,
    )
  }

  return paths
}

function SourceRow({
  source,
  registerRef,
}: {
  source: PipelineSource
  registerRef: (id: string, el: HTMLElement | null) => void
}) {
  return (
    <div
      ref={(el) => registerRef(source.id, el)}
      className={`dl-block dl-block--compact dl-block--pipeline-source dl-block--${source.theme}`}
    >
      <span className="dl-source-inner">
        <SourceIcon icon={source.icon} />
        <span className="dl-block-label">{source.label}</span>
      </span>
    </div>
  )
}

function VStageConnector() {
  return (
    <div className="dl-v-stage-connector" aria-hidden>
      <svg viewBox="0 0 20 24" className="dl-v-stage-connector-svg">
        <line x1="10" y1="2" x2="10" y2="18" stroke="#5EEAD4" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
        <line x1="10" y1="2" x2="10" y2="18" stroke="#5EEAD4" strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round" />
        <polygon points="7,16 10,22 13,16" fill="#5EEAD4" opacity="0.85" />
      </svg>
    </div>
  )
}

function FlowOverlay({ paths, width, height }: { paths: FlowPath[]; width: number; height: number }) {
  if (width <= 0 || height <= 0 || paths.length === 0) return null

  return (
    <svg className="dl-capture-flow" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
      {paths.map((path) => (
        <g key={path.id}>
          <path
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeOpacity={0.4}
            strokeWidth={1.25}
            strokeDasharray="4 3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle r="2.5" fill={path.color} opacity="0.95">
            <animateMotion
              dur={`${path.dur}s`}
              repeatCount="indefinite"
              begin={`${path.delay}s`}
              path={path.d}
            />
          </circle>
        </g>
      ))}
    </svg>
  )
}

export function CapturePipelineDiagram() {
  const boardRef = useRef<HTMLDivElement>(null)
  const sourcesColRef = useRef<HTMLElement>(null)
  const sourcesGutterRef = useRef<HTMLDivElement>(null)
  const storageColRef = useRef<HTMLElement>(null)
  const storageGutterRef = useRef<HTMLDivElement>(null)
  const stagesColRef = useRef<HTMLElement>(null)
  const storeGutterRef = useRef<HTMLDivElement>(null)
  const storeColRef = useRef<HTMLElement>(null)
  const sourceRefs = useRef(new Map<string, HTMLElement>())
  const stageRefs = useRef<HTMLElement[]>([])
  const storeCompRefs = useRef<HTMLElement[]>([])
  const [paths, setPaths] = useState<FlowPath[]>([])
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 })

  const registerSourceRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sourceRefs.current.set(id, el)
    else sourceRefs.current.delete(id)
  }, [])

  const registerStageRef = useCallback((index: number, el: HTMLElement | null) => {
    if (el) stageRefs.current[index] = el
    else delete stageRefs.current[index]
  }, [])

  const registerStoreCompRef = useCallback((index: number, el: HTMLElement | null) => {
    if (el) storeCompRefs.current[index] = el
    else delete storeCompRefs.current[index]
  }, [])

  const updatePaths = useCallback(() => {
    const board = boardRef.current
    if (!board) return

    const rect = board.getBoundingClientRect()
    setBoardSize({ w: rect.width, h: rect.height })

    const stages = stageRefs.current.filter(Boolean)
    const storeComps = storeCompRefs.current.filter(Boolean)

    setPaths(
      measurePaths(
        board,
        sourcesColRef.current,
        sourcesGutterRef.current,
        storageColRef.current,
        storageGutterRef.current,
        stagesColRef.current,
        storeGutterRef.current,
        storeColRef.current,
        sourceRefs.current,
        stages,
        storeComps,
      ),
    )
  }, [])

  useLayoutEffect(() => {
    updatePaths()
    const board = boardRef.current
    if (!board) return

    const observer = new ResizeObserver(updatePaths)
    observer.observe(board)
    window.addEventListener('resize', updatePaths)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updatePaths)
    }
  }, [updatePaths])

  return (
    <div className="dl-viz dl-viz--capture">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-capture-board" ref={boardRef}>
        <section ref={sourcesColRef} className="dl-lane dl-capture-col dl-capture-col--sources">
          <h3 className="dl-lane-title">Sources</h3>
          <div className="dl-capture-source-list">
            {PIPELINE_SOURCES.map((source) => (
              <SourceRow key={source.id} source={source} registerRef={registerSourceRef} />
            ))}
          </div>
        </section>

        <div ref={sourcesGutterRef} className="dl-capture-gutter dl-capture-gutter--sources" aria-hidden />

        <section ref={storageColRef} className="dl-lane dl-capture-col dl-capture-col--storage">
          <h3 className="dl-lane-title">Central storage</h3>
          <div className="dl-capture-storage-stack">
            <div className="dl-block dl-block--storage">
              <span className="dl-block-label">{PIPELINE_STORAGE.label}</span>
              <span className="dl-block-sublabel">{PIPELINE_STORAGE.subtitle}</span>
            </div>
            <p className="dl-capture-storage-note">{PIPELINE_STORAGE_NOTE}</p>
          </div>
        </section>

        <div ref={storageGutterRef} className="dl-capture-gutter dl-capture-gutter--storage" aria-hidden />

        <section ref={stagesColRef} className="dl-lane dl-capture-col dl-capture-col--stages">
          <h3 className="dl-lane-title">Processing</h3>
          <div className="dl-capture-stage-list">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.id} className="dl-capture-stage-step">
                {i > 0 && <VStageConnector />}
                <div
                  ref={(el) => registerStageRef(i, el)}
                  className="dl-block dl-block--compact dl-block--stage"
                >
                  <span className="dl-stage-num">{i + 1}</span>
                  <span className="dl-block-label">{stage.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div ref={storeGutterRef} className="dl-capture-gutter dl-capture-gutter--store" aria-hidden />

        <section ref={storeColRef} className="dl-lane dl-capture-col dl-capture-col--store">
          <h3 className="dl-lane-title">{KNOWLEDGE_STORE.title}</h3>
          <div className="dl-store-grid">
            {KNOWLEDGE_STORE.compartments.map((comp, i) => (
              <div
                key={comp}
                ref={(el) => registerStoreCompRef(i, el)}
                className="dl-block dl-block--compact dl-block--store-comp"
              >
                <span className="dl-block-label">{comp}</span>
              </div>
            ))}
          </div>
        </section>

        <FlowOverlay paths={paths} width={boardSize.w} height={boardSize.h} />
      </div>
    </div>
  )
}
