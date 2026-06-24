import { useMemo, useState } from 'react'
import { MATURITY_LEVELS, type MaturityLevel } from './flow-theme'

const LEVEL_COUNT = MATURITY_LEVELS.length

function stepAnchor(index: number) {
  return {
    x: 10 + index * 11.5,
    y: 91 - index * 14.8,
  }
}

function smoothAscentPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1]
    const curr = points[i]
    const midY = (prev.y + curr.y) / 2
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`
  }
  return d
}

function AscentTrail({ activeStep }: { activeStep: number }) {
  const points = useMemo(() => MATURITY_LEVELS.map((_, i) => stepAnchor(i)), [])
  const litPoints = points.slice(0, activeStep + 1)
  const fullPath = smoothAscentPath(points)
  const litPath = smoothAscentPath(litPoints)

  return (
    <svg viewBox="0 0 100 100" className="dl-maturity-deps" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id="dl-maturity-path-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#5EEAD4" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="dl-maturity-pillar-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      <rect
        x="3.5"
        y={points[activeStep].y - 1.5}
        width="4"
        height={92 - points[activeStep].y}
        rx="1.2"
        fill="url(#dl-maturity-pillar-grad)"
        opacity="0.9"
      />

      {points.map((p, i) => {
        const lit = i <= activeStep
        const shelfWidth = 7 + i * 2.2
        return (
          <g key={`shelf-${MATURITY_LEVELS[i].id}`}>
            <line
              x1="3.5"
              y1={p.y}
              x2={3.5 + shelfWidth}
              y2={p.y}
              stroke={lit ? 'rgba(94,234,212,0.55)' : 'rgba(148,163,184,0.18)'}
              strokeWidth={lit ? 0.55 : 0.35}
              strokeLinecap="round"
            />
            <circle
              cx={3.5 + shelfWidth}
              cy={p.y}
              r={lit ? 0.65 : 0.45}
              fill={lit ? 'rgba(94,234,212,0.7)' : 'rgba(148,163,184,0.25)'}
            />
          </g>
        )
      })}

      {fullPath ? (
        <path
          d={fullPath}
          fill="none"
          stroke="rgba(148,163,184,0.16)"
          strokeWidth="0.38"
          strokeDasharray="1.4 1.6"
          strokeLinecap="round"
        />
      ) : null}

      {litPath && activeStep > 0 ? (
        <path
          d={litPath}
          fill="none"
          stroke="url(#dl-maturity-path-grad)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  )
}

function LevelStep({
  level,
  index,
  activeStep,
  onSelect,
}: {
  level: MaturityLevel
  index: number
  activeStep: number
  onSelect: (index: number) => void
}) {
  const status = index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending'

  return (
    <button
      type="button"
      className={`dl-maturity-step dl-maturity-step--${status}`}
      style={{ marginLeft: `${index * 11}%`, zIndex: index + 1 }}
      onClick={() => onSelect(index)}
      aria-current={status === 'active' ? 'step' : undefined}
      title={level.label}
    >
      <span className="dl-maturity-step-num">{index + 1}</span>
      <span className="dl-maturity-step-label">{level.shortLabel}</span>
    </button>
  )
}

function LevelDetail({ level, index }: { level: MaturityLevel; index: number }) {
  return (
    <div className="dl-maturity-detail">
      <h4 className="dl-maturity-detail-title">{level.label}</h4>
      <dl className="dl-maturity-detail-list">
        <div className="dl-maturity-detail-row">
          <dt>Primary capability</dt>
          <dd>{level.primaryCapability}</dd>
        </div>
        <div className="dl-maturity-detail-row dl-maturity-detail-row--foundation">
          <dt>Required foundation</dt>
          <dd>{level.requiredFoundation}</dd>
        </div>
        <div className="dl-maturity-detail-row">
          <dt>Example use case</dt>
          <dd>{level.exampleUseCase}</dd>
        </div>
        <div className="dl-maturity-detail-row">
          <dt>Success metric</dt>
          <dd>{level.successMetric}</dd>
        </div>
        <div className="dl-maturity-detail-row dl-maturity-detail-row--governance">
          <dt>Governance requirement</dt>
          <dd>{level.governanceRequirement}</dd>
        </div>
      </dl>
      <p className="dl-maturity-detail-meta">
        Level {index + 1} of {LEVEL_COUNT}
        {index > 0 ? ' · builds on earlier levels' : ' · foundation for all automation'}
      </p>
    </div>
  )
}

export function MaturityPathDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const selected = MATURITY_LEVELS[activeStep] ?? MATURITY_LEVELS[0]

  return (
    <div className="dl-viz dl-viz--maturity">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-maturity-board">
        <section className="dl-lane dl-maturity-col dl-maturity-col--path">
          <h3 className="dl-lane-title">Adoption staircase</h3>
          <p className="dl-maturity-hint">
            Click a level — foundation shelves show what each stage builds on
          </p>
          <div className="dl-maturity-path-wrap">
            <AscentTrail activeStep={activeStep} />
            <div className="dl-maturity-stairs">
              {MATURITY_LEVELS.map((level, i) => (
                <LevelStep
                  key={level.id}
                  level={level}
                  index={i}
                  activeStep={activeStep}
                  onSelect={setActiveStep}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="dl-lane dl-maturity-col dl-maturity-col--detail">
          <h3 className="dl-lane-title">Level detail</h3>
          <LevelDetail key={selected.id} level={selected} index={activeStep} />
        </section>
      </div>
    </div>
  )
}
