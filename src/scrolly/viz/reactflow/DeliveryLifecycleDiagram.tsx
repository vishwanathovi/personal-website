import { FLOW_COLORS, LIFECYCLE_STEPS, type LifecycleStep } from './flow-theme'

function StepIcon({ id }: { id: string }) {
  const props = { className: 'dl-block-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, 'aria-hidden': true as const }
  switch (id) {
    case 'client':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M10 13h4M10 17h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'discover':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
      )
    case 'clarify':
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'design':
      return (
        <svg {...props}>
          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'setup':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
      )
    case 'produce':
      return (
        <svg {...props}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    case 'deliver':
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m22 4-10 10-3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function Block({ step }: { step: LifecycleStep }) {
  const isHero = step.id === 'deliver'
  const laneClass = step.lane === 'discovery' ? 'dl-block--purple' : 'dl-block--teal'
  return (
    <div
      className={[
        'dl-block',
        laneClass,
        step.bold ? 'dl-block--bold' : '',
        isHero ? 'dl-block--hero' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <StepIcon id={step.id} />
      <span className="dl-block-label">{step.label}</span>
    </div>
  )
}

function HConnector({ label, lane }: { label: string; lane: 'discovery' | 'production' }) {
  const accent = lane === 'discovery' ? FLOW_COLORS.purple : FLOW_COLORS.teal
  const gradId = `dl-hgrad-${label}`

  return (
    <div className="dl-h-connector">
      <svg viewBox="0 0 48 20" className="dl-h-connector-svg" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <line x1="4" y1="10" x2="44" y2="10" stroke={accent} strokeOpacity="0.15" strokeWidth="6" strokeLinecap="round" />
        <line x1="4" y1="10" x2="44" y2="10" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="42,6 48,10 42,14" fill={accent} opacity="0.9" />
        <circle r="3" fill={accent} cx="8" cy="10" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5">
          <animate attributeName="cx" from="8" to="40" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="dl-h-connector-label">{label}</span>
    </div>
  )
}

function LaneBridge() {
  const gradId = 'dl-bridge-grad-v'
  const accent = FLOW_COLORS.teal

  return (
    <div className="dl-bridge" aria-hidden>
      <svg viewBox="0 0 32 40" className="dl-bridge-svg" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={FLOW_COLORS.purple} stopOpacity="0.35" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.85" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <line x1="16" y1="6" x2="16" y2="28" stroke={accent} strokeOpacity="0.15" strokeWidth="6" strokeLinecap="round" />
        <line x1="16" y1="6" x2="16" y2="28" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="12,26 16,34 20,26" fill={accent} opacity="0.9" />
        <circle r="3" fill={accent} cx="16" cy="8" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5">
          <animate attributeName="cy" from="8" to="28" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="dl-bridge-label">handoff</span>
    </div>
  )
}

function Lane({ lane, title, steps }: { lane: 'discovery' | 'production'; title: string; steps: LifecycleStep[] }) {
  return (
    <section className={`dl-lane dl-lane--${lane}`}>
      <h3 className="dl-lane-title">{title}</h3>
      <div className="dl-lane-row">
        {steps.map((step, i) => (
          <div key={step.id} className="dl-lane-step">
            {i > 0 && step.edgeLabel && <HConnector label={step.edgeLabel} lane={lane} />}
            <Block step={step} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function DeliveryLifecycleDiagram() {
  const discovery = LIFECYCLE_STEPS.filter((s) => s.lane === 'discovery')
  const production = LIFECYCLE_STEPS.filter((s) => s.lane === 'production')

  return (
    <div className="dl-viz">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-board">
        <Lane lane="discovery" title="Project Initial Phase" steps={discovery} />
        <LaneBridge />
        <Lane lane="production" title="Production & Delivery" steps={production} />
      </div>
    </div>
  )
}
