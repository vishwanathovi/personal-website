import { useMemo, useState } from 'react'
import { FLYWHEEL_SKILL_MODULES, LEARNING_FLYWHEEL_STAGES } from './flow-theme'

const STAGE_COUNT = LEARNING_FLYWHEEL_STAGES.length
const STAGE_RADIUS = 43

function ringPositions(count: number, radiusPct: number, startDeg = -90) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((startDeg + (360 / count) * i) * Math.PI) / 180
    return {
      left: 50 + radiusPct * Math.cos(angle),
      top: 50 + radiusPct * Math.sin(angle),
    }
  })
}

function FlywheelRingSvg({ activeStep }: { activeStep: number }) {
  const cx = 50
  const cy = 50
  const r = STAGE_RADIUS

  const stagePoints = useMemo(
    () =>
      LEARNING_FLYWHEEL_STAGES.map((_, i) => {
        const a = ((-90 + (360 / STAGE_COUNT) * i) * Math.PI) / 180
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
      }),
    [],
  )

  return (
    <svg viewBox="0 0 100 100" className="dl-flywheel-svg" aria-hidden>
      <defs>
        <linearGradient id="dl-flywheel-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.35" />
        </linearGradient>
        <marker id="dl-flywheel-arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <polygon points="0,0 4,2 0,4" fill="rgba(94,234,212,0.6)" />
        </marker>
      </defs>
      <circle cx={cx} cy={cy} r={STAGE_RADIUS} fill="none" stroke="url(#dl-flywheel-ring-grad)" strokeWidth="0.55" opacity="0.85" />
      {stagePoints.map((p, i) => {
        const next = stagePoints[(i + 1) % STAGE_COUNT]
        const active = i <= activeStep
        return (
          <line
            key={LEARNING_FLYWHEEL_STAGES[i].id}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke={active ? 'rgba(94,234,212,0.55)' : 'rgba(148,163,184,0.2)'}
            strokeWidth="0.35"
            strokeDasharray={active ? 'none' : '1 1'}
            markerEnd="url(#dl-flywheel-arrow)"
          />
        )
      })}
    </svg>
  )
}

export function LearningFlywheelDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const stagePositions = useMemo(() => ringPositions(STAGE_COUNT, STAGE_RADIUS), [])
  const skillProgress = (activeStep + 1) / STAGE_COUNT

  return (
    <div className="dl-viz dl-viz--flywheel">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-flywheel-board">
        <p className="dl-flywheel-cta">
          <span className="dl-flywheel-cta-icon" aria-hidden>
            ↻
          </span>
          Click a stage to advance the learning loop
        </p>

        <div className="dl-flywheel-arena">
          <FlywheelRingSvg activeStep={activeStep} />

          <div className="dl-flywheel-core">
            <span className="dl-flywheel-core-label">Turing Delivery Intelligence</span>
            <span className="dl-flywheel-core-meta">
              Stage {activeStep + 1} of {STAGE_COUNT}
            </span>
          </div>

          {LEARNING_FLYWHEEL_STAGES.map((stage, i) => {
            const pos = stagePositions[i]
            const status = i < activeStep ? 'complete' : i === activeStep ? 'active' : 'pending'
            return (
              <button
                key={stage.id}
                type="button"
                className={`dl-flywheel-stage dl-flywheel-stage--${status}`}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                onClick={() => setActiveStep(i)}
                aria-current={status === 'active' ? 'step' : undefined}
                title={stage.label}
              >
                <span className="dl-flywheel-stage-num">{i + 1}</span>
                <span className="dl-flywheel-stage-label">{stage.shortLabel}</span>
              </button>
            )
          })}
        </div>

        <div className="dl-flywheel-skills">
          <h4 className="dl-flywheel-skills-heading">Skills & templates strengthen</h4>
          <div className="dl-flywheel-skills-row">
            {FLYWHEEL_SKILL_MODULES.map((skill, i) => {
              const strength = Math.min(1, skillProgress + i * 0.03)
              return (
                <span
                  key={skill.id}
                  className={`dl-flywheel-skill-chip${strength >= 0.5 ? ' dl-flywheel-skill-chip--lit' : ''}`}
                  style={{ opacity: 0.4 + strength * 0.6 }}
                >
                  {skill.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
