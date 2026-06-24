import { useState } from 'react'
import { PRODUCTION_COPILOT_ROLES, type CopilotMockLine, type CopilotRole } from './flow-theme'

const FLOW_STEPS = [
  { key: 'questions', label: 'Questions', field: 'questionsReceived' as const, kind: 'in' },
  { key: 'knowledge', label: 'Knowledge', field: 'knowledgeAccessed' as const, kind: 'knowledge' },
  { key: 'ai', label: 'AI assist', field: 'aiAssistance' as const, kind: 'ai' },
  { key: 'human', label: 'Human', field: 'humanDecision' as const, kind: 'human' },
  { key: 'return', label: 'Return', field: 'dataReturned' as const, kind: 'return' },
]

function AiBadge({ compact }: { compact?: boolean }) {
  return (
    <span className={`dl-copilot-symbol dl-copilot-symbol--ai${compact ? ' dl-copilot-symbol--compact' : ''}`} title="AI recommendation">
      <span aria-hidden>✦</span>
      {!compact && <span className="dl-copilot-symbol-label">AI</span>}
    </span>
  )
}

function HumanBadge({ compact }: { compact?: boolean }) {
  return (
    <span className={`dl-copilot-symbol dl-copilot-symbol--human${compact ? ' dl-copilot-symbol--compact' : ''}`} title="Human decision">
      <span aria-hidden>✓</span>
      {!compact && <span className="dl-copilot-symbol-label">Human</span>}
    </span>
  )
}

function FlowNodeIcon({ kind }: { kind: string }) {
  if (kind === 'ai') return <AiBadge compact />
  if (kind === 'human') return <HumanBadge compact />
  const icon = kind === 'in' ? '?' : kind === 'knowledge' ? '◈' : '↩'
  return (
    <span className={`dl-copilot-flow-icon dl-copilot-flow-icon--${kind}`} aria-hidden>
      {icon}
    </span>
  )
}

function FlowArrow() {
  return (
    <span className="dl-copilot-flow-arrow" aria-hidden>
      →
    </span>
  )
}

function LaneCard({
  role,
  isActive,
  onSelect,
}: {
  role: CopilotRole
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`dl-copilot-lane dl-copilot-lane--${role.theme}${isActive ? ' dl-copilot-lane--active' : ''}`}
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <span className="dl-copilot-lane-title">{role.label}</span>
      <div className="dl-copilot-lane-flow">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.key} className="dl-copilot-lane-flow-step">
            {i > 0 && <FlowArrow />}
            <div className={`dl-copilot-flow-node dl-copilot-flow-node--${step.kind}`}>
              <FlowNodeIcon kind={step.kind} />
              <span className="dl-copilot-flow-node-label">{step.label}</span>
            </div>
          </div>
        ))}
      </div>
    </button>
  )
}

function MockLine({ line }: { line: CopilotMockLine }) {
  if (line.kind === 'ai') {
    return (
      <div className="dl-copilot-mock-line dl-copilot-mock-line--ai">
        <AiBadge />
        <span>{line.text}</span>
      </div>
    )
  }
  if (line.kind === 'human') {
    return (
      <div className="dl-copilot-mock-line dl-copilot-mock-line--human">
        <HumanBadge />
        <span>{line.text}</span>
      </div>
    )
  }
  return (
    <div className={`dl-copilot-mock-line dl-copilot-mock-line--${line.kind}`}>
      <span>{line.text}</span>
    </div>
  )
}

function MockPanel({ role }: { role: CopilotRole }) {
  return (
    <div className={`dl-copilot-mock dl-copilot-mock--${role.theme}`}>
      <div className="dl-copilot-mock-chrome">
        <span className="dl-copilot-mock-dot" />
        <span className="dl-copilot-mock-dot" />
        <span className="dl-copilot-mock-dot" />
        <span className="dl-copilot-mock-title">{role.mockTitle}</span>
      </div>
      <div className="dl-copilot-mock-body">
        {role.mockLines.map((line, i) => (
          <MockLine key={i} line={line} />
        ))}
      </div>
      <div className="dl-copilot-mock-detail">
        {FLOW_STEPS.map((step) => (
          <div key={step.key} className="dl-copilot-mock-detail-row">
            <span className="dl-copilot-mock-detail-label">{step.label}</span>
            <span className="dl-copilot-mock-detail-value">{role[step.field]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductionCopilotsDiagram() {
  const [selectedId, setSelectedId] = useState<CopilotRole['id']>(PRODUCTION_COPILOT_ROLES[0].id)
  const selected = PRODUCTION_COPILOT_ROLES.find((r) => r.id === selectedId) ?? PRODUCTION_COPILOT_ROLES[0]

  return (
    <div className="dl-viz dl-viz--copilots">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-copilot-board">
        <div className="dl-copilot-legend" aria-label="Symbol legend">
          <span className="dl-copilot-legend-item">
            <AiBadge compact />
            <span>AI recommendation</span>
          </span>
          <span className="dl-copilot-legend-item">
            <HumanBadge compact />
            <span>Human retains final decision</span>
          </span>
        </div>

        <p className="dl-copilot-cta">
          <span className="dl-copilot-cta-icon" aria-hidden>
            →
          </span>
          Click a role lane to explore its copilot interface
        </p>

        <section className="dl-lane dl-copilot-col dl-copilot-col--lanes">
          <h3 className="dl-lane-title">Production lanes</h3>
          <div className="dl-copilot-lanes">
            {PRODUCTION_COPILOT_ROLES.map((role) => (
              <LaneCard
                key={role.id}
                role={role}
                isActive={role.id === selectedId}
                onSelect={() => setSelectedId(role.id)}
              />
            ))}
          </div>
        </section>

        <section className="dl-lane dl-copilot-col dl-copilot-col--mock">
          <h3 className="dl-lane-title">Role interface</h3>
          <MockPanel key={selected.id} role={selected} />
        </section>

        <section className="dl-lane dl-copilot-col dl-copilot-col--hub">
          <h3 className="dl-lane-title">Project knowledge layer</h3>
          <p className="dl-copilot-hub-note">Each lane reads governed knowledge and returns approved signals — never bypassing human gates.</p>
          <div className="dl-copilot-hub">
            <span className="dl-copilot-hub-core">Project Knowledge</span>
            {PRODUCTION_COPILOT_ROLES.map((role) => (
              <div key={role.id} className={`dl-copilot-hub-link dl-copilot-hub-link--${role.theme}`}>
                <span className="dl-copilot-hub-link-label">{role.label}</span>
                <span className="dl-copilot-hub-link-flow">
                  <span>read</span>
                  <span aria-hidden>↔</span>
                  <span>return</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
