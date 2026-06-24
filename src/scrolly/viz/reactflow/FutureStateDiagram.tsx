import { useState } from 'react'
import {
  ARCHITECTURE_FLOW_STAGES,
  ARCHITECTURE_ROLES,
  ARCHITECTURE_SYSTEMS,
} from './flow-theme'

const FLOW_ROW_A = ARCHITECTURE_FLOW_STAGES.slice(0, 4)
const FLOW_ROW_B = ARCHITECTURE_FLOW_STAGES.slice(4)
const MAX_BUILD_PHASE = 4

const BUILD_LABELS = [
  'Click to begin building the architecture',
  'Click to reveal the role layer',
  'Click to reveal the system layer',
  'Click to activate the learning loop',
  'Stable operating system — learning loop active',
] as const

function FlowArrow({ lit }: { lit: boolean }) {
  return (
    <span className={`dl-arch-flow-arrow${lit ? ' dl-arch-flow-arrow--lit' : ''}`} aria-hidden>
      →
    </span>
  )
}

function FlowDownLink({ lit }: { lit: boolean }) {
  return (
    <div className={`dl-arch-flow-down${lit ? ' dl-arch-flow-down--lit' : ''}`} aria-hidden>
      <span className="dl-arch-flow-down-line" />
      <span className="dl-arch-flow-down-cap">↓</span>
    </div>
  )
}

function FlowNode({
  label,
  shortLabel,
  index,
  visible,
  settled,
}: {
  label: string
  shortLabel: string
  index: number
  visible: boolean
  settled: boolean
}) {
  return (
    <div
      className={`dl-arch-flow-node${visible ? ' dl-arch-flow-node--visible' : ''}${settled ? ' dl-arch-flow-node--settled' : ''}`}
      style={{ animationDelay: `${index * 70}ms` }}
      title={label}
    >
      <span className="dl-arch-flow-node-label">{shortLabel}</span>
    </div>
  )
}

function FeedbackLoop({ active }: { active: boolean }) {
  const pathId = 'dl-arch-feedback-path'

  return (
    <div className={`dl-arch-loop${active ? ' dl-arch-loop--active' : ''}`}>
      <svg viewBox="0 0 360 52" className="dl-arch-loop-svg" aria-hidden>
        <defs>
          <linearGradient id="dl-arch-loop-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.55" />
          </linearGradient>
          <marker id="dl-arch-loop-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <polygon points="0,0 5,2.5 0,5" fill="rgba(251,191,36,0.8)" />
          </marker>
        </defs>
        <path
          id={pathId}
          d="M 24 14 C 90 44, 270 44, 336 14"
          fill="none"
          stroke="url(#dl-arch-loop-grad)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#dl-arch-loop-arrow)"
          className="dl-arch-loop-path"
        />
        {active ? (
          <circle r="4" fill="#FBBF24" className="dl-arch-loop-packet">
            <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        ) : null}
      </svg>
      <span className="dl-arch-loop-label">↺ Learning feeds the next project</span>
    </div>
  )
}

function ChipRow({
  title,
  items,
  visible,
  settled,
  variant,
}: {
  title: string
  items: ReadonlyArray<{ id: string; label: string; shortLabel?: string }>
  visible: boolean
  settled: boolean
  variant: 'roles' | 'systems'
}) {
  return (
    <section
      className={`dl-arch-layer dl-arch-layer--${variant}${visible ? ' dl-arch-layer--visible' : ''}${settled ? ' dl-arch-layer--settled' : ''}`}
    >
      <h4 className="dl-arch-layer-title">{title}</h4>
      <div className="dl-arch-chip-row">
        {items.map((item, i) => (
          <span
            key={item.id}
            className="dl-arch-chip"
            style={{ animationDelay: `${i * 45}ms` }}
            title={item.label}
          >
            {item.shortLabel ?? item.label}
          </span>
        ))}
      </div>
    </section>
  )
}

export function FutureStateDiagram() {
  const [buildPhase, setBuildPhase] = useState(0)
  const isComplete = buildPhase >= MAX_BUILD_PHASE
  const flowVisible = buildPhase >= 1
  const rolesVisible = buildPhase >= 2
  const systemsVisible = buildPhase >= 3
  const loopActive = buildPhase >= 4

  const ctaLabel = BUILD_LABELS[Math.min(buildPhase, BUILD_LABELS.length - 1)]

  const advance = () => {
    if (buildPhase < MAX_BUILD_PHASE) setBuildPhase((p) => p + 1)
  }

  return (
    <div className="dl-viz dl-viz--arch">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-arch-board">
        <button
          type="button"
          className={`dl-arch-cta${isComplete ? ' dl-arch-cta--complete' : ''}`}
          onClick={advance}
          disabled={isComplete}
        >
          <span className="dl-arch-cta-icon" aria-hidden>
            {isComplete ? '◉' : '▶'}
          </span>
          {ctaLabel}
        </button>

        <div className={`dl-arch-flow-wrap${flowVisible ? ' dl-arch-flow-wrap--visible' : ''}`}>
          <h4 className="dl-arch-section-label">Primary flow</h4>
          <div className="dl-arch-flow-row">
            {FLOW_ROW_A.map((stage, i) => (
              <div key={stage.id} className="dl-arch-flow-step">
                {i > 0 ? <FlowArrow lit={flowVisible} /> : null}
                <FlowNode
                  label={stage.label}
                  shortLabel={stage.shortLabel}
                  index={i}
                  visible={flowVisible}
                  settled={isComplete}
                />
              </div>
            ))}
          </div>

          <FlowDownLink lit={flowVisible} />

          <div className="dl-arch-flow-row">
            {FLOW_ROW_B.map((stage, i) => (
              <div key={stage.id} className="dl-arch-flow-step">
                {i > 0 ? <FlowArrow lit={flowVisible} /> : null}
                <FlowNode
                  label={stage.label}
                  shortLabel={stage.shortLabel}
                  index={i + 4}
                  visible={flowVisible}
                  settled={isComplete}
                />
              </div>
            ))}
          </div>

          <FeedbackLoop active={loopActive} />
        </div>

        <ChipRow
          title="Role layer"
          items={ARCHITECTURE_ROLES}
          visible={rolesVisible}
          settled={isComplete}
          variant="roles"
        />

        <ChipRow
          title="System layer"
          items={ARCHITECTURE_SYSTEMS}
          visible={systemsVisible}
          settled={isComplete}
          variant="systems"
        />

        {isComplete ? (
          <p className="dl-arch-status">
            Layer {MAX_BUILD_PHASE} of {MAX_BUILD_PHASE} · calm feedback circulation
          </p>
        ) : (
          <p className="dl-arch-status">
            Layer {Math.max(0, buildPhase)} of {MAX_BUILD_PHASE}
            {buildPhase === 0 ? ' · ready to build' : ' · click to continue'}
          </p>
        )}
      </div>
    </div>
  )
}
