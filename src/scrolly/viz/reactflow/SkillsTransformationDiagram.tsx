import {
  REUSABLE_SKILLS,
  SCATTERED_PROMPTS,
  SKILL_BUILDER_COMPONENTS,
  type ScatteredPrompt,
} from './flow-theme'

function PromptCard({ prompt }: { prompt: ScatteredPrompt }) {
  return (
    <article
      className="dl-skills-prompt"
      style={{
        transform: `translateX(${prompt.offset.x}px) rotate(${prompt.offset.rotate}deg)`,
      }}
    >
      <div className="dl-skills-prompt-prompt">
        <span className="dl-skills-prompt-quote" aria-hidden>
          “
        </span>
        {prompt.label}
      </div>
      <div className={`dl-skills-prompt-output dl-skills-prompt-output--${prompt.outputStyle}`}>
        {prompt.outputPreview}
      </div>
      <span className="dl-skills-prompt-flag" aria-hidden>
        no shared context
      </span>
    </article>
  )
}

function InGutterArrows() {
  return (
    <svg viewBox="0 0 28 220" className="dl-skills-gutter-svg" preserveAspectRatio="none" aria-hidden>
      <path d="M0,36 C14,36 14,110 28,110" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
      <path d="M0,82 C14,82 14,110 28,110" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
      <path d="M0,128 C14,128 14,110 28,110" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
      <path d="M0,174 C14,174 14,110 28,110" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
      <polygon points="24,106 28,110 24,114" fill="rgba(148,163,184,0.55)" />
    </svg>
  )
}

function OutGutterArrows() {
  return (
    <svg viewBox="0 0 28 220" className="dl-skills-gutter-svg" preserveAspectRatio="none" aria-hidden>
      <path d="M0,110 C14,110 14,28 28,28" fill="none" stroke="rgba(94,234,212,0.45)" strokeWidth="1" />
      <path d="M0,110 C14,110 14,62 28,62" fill="none" stroke="rgba(94,234,212,0.5)" strokeWidth="1" />
      <path d="M0,110 C14,110 14,96 28,96" fill="none" stroke="rgba(94,234,212,0.5)" strokeWidth="1" />
      <path d="M0,110 C14,110 14,130 28,130" fill="none" stroke="rgba(94,234,212,0.5)" strokeWidth="1" />
      <path d="M0,110 C14,110 14,164 28,164" fill="none" stroke="rgba(94,234,212,0.45)" strokeWidth="1" />
      <path d="M0,110 C14,110 14,198 28,198" fill="none" stroke="rgba(94,234,212,0.45)" strokeWidth="1" />
      <polygon points="24,24 28,28 24,32" fill="rgba(94,234,212,0.7)" />
      <polygon points="24,58 28,62 24,66" fill="rgba(94,234,212,0.7)" />
      <polygon points="24,92 28,96 24,100" fill="rgba(94,234,212,0.7)" />
      <polygon points="24,126 28,130 24,134" fill="rgba(94,234,212,0.7)" />
      <polygon points="24,160 28,164 24,168" fill="rgba(94,234,212,0.7)" />
      <polygon points="24,194 28,198 24,202" fill="rgba(94,234,212,0.7)" />
    </svg>
  )
}

function SkillModule({ label }: { label: string }) {
  return (
    <article className="dl-skills-module">
      <span className="dl-skills-module-port dl-skills-module-port--in">IN</span>
      <div className="dl-skills-module-body">
        <span className="dl-skills-module-label">{label}</span>
        <span className="dl-skills-module-schema">schema-valid output</span>
      </div>
      <span className="dl-skills-module-port dl-skills-module-port--out">OUT</span>
    </article>
  )
}

export function SkillsTransformationDiagram() {
  return (
    <div className="dl-viz dl-viz--skills">
      <div className="dl-nebula" aria-hidden />
      <div className="dl-skills-board">
        <section className="dl-lane dl-skills-col dl-skills-col--before">
          <h3 className="dl-lane-title">Before</h3>
          <p className="dl-skills-col-hint">Ad hoc prompts · inconsistent outputs</p>
          <div className="dl-skills-prompts">
            {SCATTERED_PROMPTS.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>

        <div className="dl-skills-gutter dl-skills-gutter--in" aria-hidden>
          <InGutterArrows />
        </div>

        <section className="dl-lane dl-skills-col dl-skills-col--builder">
          <h3 className="dl-lane-title">Skill Builder</h3>
          <p className="dl-skills-col-hint">Standardisation layer</p>
          <div className="dl-skills-builder">
            <div className="dl-skills-builder-core">
              {SKILL_BUILDER_COMPONENTS.map((item) => (
                <span key={item} className="dl-skills-builder-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="dl-skills-gutter dl-skills-gutter--out" aria-hidden>
          <OutGutterArrows />
        </div>

        <section className="dl-lane dl-skills-col dl-skills-col--after">
          <h3 className="dl-lane-title">After</h3>
          <p className="dl-skills-col-hint">Reusable skills · consistent interfaces</p>
          <div className="dl-skills-modules">
            {REUSABLE_SKILLS.map((skill) => (
              <SkillModule key={skill.id} label={skill.label} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
