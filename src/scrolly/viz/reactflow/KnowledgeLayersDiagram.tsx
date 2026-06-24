import { useState, type ReactNode } from 'react'
import {
  AUTHORITY_LAYERS,
  REQUIREMENT_HISTORIES,
  ROLE_ASSISTANTS,
  type KnowledgeLayer,
  type RequirementHistory,
  type RequirementHistoryStep,
} from './flow-theme'

function LayerBand({ layer, children }: { layer: KnowledgeLayer; children?: ReactNode }) {
  return (
    <div className={`dl-layer-band dl-layer-band--${layer.theme}`}>
      <span className="dl-layer-band-label">{layer.label}</span>
      {children ? <div className="dl-layer-band-content">{children}</div> : null}
    </div>
  )
}

function RoleBlock({ label }: { label: string }) {
  return (
    <div className="dl-block dl-block--compact dl-block--layer-role">
      <span className="dl-block-label">{label}</span>
    </div>
  )
}

function HistoryStepRow({ step, isLast }: { step: RequirementHistoryStep; isLast: boolean }) {
  const statusClass =
    step.status === 'current'
      ? 'dl-history-step--current'
      : step.status === 'superseded'
        ? 'dl-history-step--superseded'
        : 'dl-history-step--neutral'

  return (
    <div className="dl-history-step-wrap">
      <div className={`dl-block dl-block--compact dl-history-step ${statusClass}`}>
        <span className="dl-block-label">{step.label}</span>
        {step.meta ? <span className="dl-history-meta">{step.meta}</span> : null}
        {step.status === 'superseded' ? <span className="dl-history-badge">superseded</span> : null}
        {step.status === 'current' ? <span className="dl-history-badge dl-history-badge--current">current</span> : null}
      </div>
      {!isLast && (
        <div className="dl-history-connector" aria-hidden>
          <svg viewBox="0 0 16 14" className="dl-history-connector-svg">
            <line x1="8" y1="1" x2="8" y2="10" stroke="#5EEAD4" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="1" x2="8" y2="10" stroke="#5EEAD4" strokeOpacity="0.75" strokeWidth="1" strokeLinecap="round" />
            <polygon points="5,9 8,13 11,9" fill="#5EEAD4" opacity="0.85" />
          </svg>
        </div>
      )}
    </div>
  )
}

function HistoryPanel({
  selected,
  onSelect,
}: {
  selected: RequirementHistory
  onSelect: (id: string) => void
}) {
  return (
    <section className="dl-lane dl-layers-history">
      <h3 className="dl-lane-title">Requirement history</h3>

      <div className="dl-req-picker-panel">
        <h4 className="dl-req-picker-heading">Requirements</h4>
        <p className="dl-req-picker-hint">Select a requirement to trace its versions</p>
        <div className="dl-req-picker" role="listbox" aria-label="Requirements">
          {REQUIREMENT_HISTORIES.map((req) => {
            const isActive = selected.id === req.id
            return (
              <button
                key={req.id}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`dl-req-chip${isActive ? ' dl-req-chip--active' : ''}`}
                onClick={() => onSelect(req.id)}
              >
                <span className="dl-req-chip-marker" aria-hidden />
                <span className="dl-req-chip-text">{req.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="dl-history-timeline">
        <h4 className="dl-history-timeline-heading">
          <span className="dl-history-timeline-label">Version timeline</span>
          <span className="dl-history-timeline-req">{selected.label}</span>
        </h4>
        <div className="dl-history-chain" key={selected.id}>
          {selected.steps.map((step, i) => (
            <HistoryStepRow key={step.id} step={step} isLast={i === selected.steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function KnowledgeLayersDiagram() {
  const [selectedId, setSelectedId] = useState(REQUIREMENT_HISTORIES[0].id)
  const selected = REQUIREMENT_HISTORIES.find((r) => r.id === selectedId) ?? REQUIREMENT_HISTORIES[0]

  const layersTopToBottom = [...AUTHORITY_LAYERS]

  return (
    <div className="dl-viz dl-viz--layers">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-layers-board">
        <section className="dl-lane dl-layers-stack">
          <h3 className="dl-lane-title">Authority stack</h3>
          <div className="dl-layer-stack">
            {layersTopToBottom.map((layer, i) => (
              <div
                key={layer.id}
                className={`dl-layer-stack-step${layer.id === 'roles' ? ' dl-layer-stack-step--roles' : ''}`}
              >
                {i > 0 && (
                  <div
                    className={`dl-layer-fall${layer.id === 'roles' ? ' dl-layer-fall--wide' : ''}`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 14 7" className="dl-layer-fall-svg">
                      <polygon points="2,1 7,6 12,1" fill="#94A3B8" opacity="0.6" />
                    </svg>
                  </div>
                )}
                {layer.id === 'roles' ? (
                  <LayerBand layer={layer}>
                    <div className="dl-role-row">
                      {ROLE_ASSISTANTS.map((role) => (
                        <RoleBlock key={role.id} label={role.label} />
                      ))}
                    </div>
                  </LayerBand>
                ) : (
                  <LayerBand layer={layer} />
                )}
              </div>
            ))}
          </div>
        </section>

        <HistoryPanel selected={selected} onSelect={setSelectedId} />
      </div>
    </div>
  )
}
