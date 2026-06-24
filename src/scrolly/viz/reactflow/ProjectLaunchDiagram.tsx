import { useCallback, useEffect, useMemo, useState } from 'react'
import { LAUNCH_PIPELINE_STAGES, type LaunchPipelineStage } from './flow-theme'

const SECTION_ID = 'section-project-launch'

function getStepFromScroll(stageCount: number): number {
  const section = document.getElementById(SECTION_ID)
  if (!section) return 0

  const rect = section.getBoundingClientRect()
  const vh = window.innerHeight
  const anchor = vh * 0.42
  const traveled = anchor - rect.top
  const range = rect.height
  if (range <= 0) return 0

  const progress = Math.min(1, Math.max(0, traveled / range))
  return Math.min(stageCount - 1, Math.floor(progress * stageCount))
}

function StageConnector() {
  return (
    <div className="dl-launch-connector" aria-hidden>
      <svg viewBox="0 0 14 7" className="dl-launch-connector-svg">
        <polygon points="2,1 7,6 12,1" fill="#94A3B8" opacity="0.55" />
      </svg>
    </div>
  )
}

function PipelineStep({
  stage,
  index,
  activeStep,
  onSelect,
}: {
  stage: LaunchPipelineStage
  index: number
  activeStep: number
  onSelect: (index: number) => void
}) {
  const status =
    index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending'

  return (
    <button
      type="button"
      className={`dl-launch-step dl-launch-step--${status}`}
      onClick={() => onSelect(index)}
      aria-current={status === 'active' ? 'step' : undefined}
    >
      <span className="dl-launch-step-num">{index + 1}</span>
      <span className="dl-launch-step-label">{stage.shortLabel}</span>
    </button>
  )
}

function StageDetail({ stage }: { stage: LaunchPipelineStage }) {
  return (
    <div className="dl-launch-detail">
      <h4 className="dl-launch-detail-title">{stage.label}</h4>
      <dl className="dl-launch-detail-list">
        <div className="dl-launch-detail-row">
          <dt>AI action</dt>
          <dd>{stage.aiAction}</dd>
        </div>
        <div className="dl-launch-detail-row">
          <dt>Human action</dt>
          <dd>{stage.humanAction}</dd>
        </div>
        <div className="dl-launch-detail-row">
          <dt>Output created</dt>
          <dd>{stage.outputCreated}</dd>
        </div>
        <div className="dl-launch-detail-row dl-launch-detail-row--approval">
          <dt>Approval requirement</dt>
          <dd>{stage.approvalRequired}</dd>
        </div>
      </dl>
    </div>
  )
}

export function ProjectLaunchDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const stages = LAUNCH_PIPELINE_STAGES
  const selected = stages[activeStep] ?? stages[0]

  const packageArtifacts = useMemo(() => {
    const items: string[] = []
    for (let i = 0; i <= activeStep; i += 1) {
      items.push(...stages[i].packageAdds)
    }
    return items
  }, [activeStep, stages])

  const syncFromScroll = useCallback(() => {
    setActiveStep(getStepFromScroll(stages.length))
  }, [stages.length])

  useEffect(() => {
    syncFromScroll()
    window.addEventListener('scroll', syncFromScroll, { passive: true })
    window.addEventListener('resize', syncFromScroll)
    return () => {
      window.removeEventListener('scroll', syncFromScroll)
      window.removeEventListener('resize', syncFromScroll)
    }
  }, [syncFromScroll])

  return (
    <div className="dl-viz dl-viz--launch">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-launch-board">
        <section className="dl-lane dl-launch-col dl-launch-col--pipeline">
          <h3 className="dl-lane-title">Setup pipeline</h3>
          <p className="dl-launch-cta">
            <span className="dl-launch-cta-icon" aria-hidden>
              ↓
            </span>
            Click a stage to build the project package
          </p>
          <div className="dl-launch-pipeline">
            {stages.map((stage, i) => (
              <div key={stage.id} className="dl-launch-pipeline-step">
                {i > 0 && <StageConnector />}
                <PipelineStep
                  stage={stage}
                  index={i}
                  activeStep={activeStep}
                  onSelect={setActiveStep}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="dl-lane dl-launch-col dl-launch-col--detail">
          <h3 className="dl-lane-title">Stage detail</h3>
          <StageDetail stage={selected} />
        </section>

        <section className="dl-lane dl-launch-col dl-launch-col--package">
          <h3 className="dl-lane-title">Project package</h3>
          <p className="dl-launch-package-meta">
            Stage {activeStep + 1} of {stages.length}
            {activeStep === 0 ? ' · client inputs only' : activeStep === stages.length - 1 ? ' · production ready' : ''}
          </p>
          <div className="dl-launch-package-grid">
            {packageArtifacts.map((artifact, i) => (
              <span
                key={`${artifact}-${i}`}
                className="dl-launch-package-chip"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                {artifact}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
