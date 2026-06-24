import { ScrollySection } from '../../../scrolly/ScrollySection'

export function AiAdoptionGapContent() {
  return (
    <>
      <ScrollySection id="context">
        <div className="section-label">Section 01</div>
        <h2>The Investment Surge</h2>
        <p>
          Enterprise AI spending has grown nearly <strong>15× since 2018</strong>, accelerated sharply
          by generative AI in 2023. Boards approved budgets. Teams spun up pilots. Vendors promised
          transformation.
        </p>
        <p>
          But production deployments — systems that real users depend on — grew at less than half
          that rate. The money arrived before the infrastructure to spend it well.
        </p>
        <div className="data-source-tag">Source: Industry surveys, Gartner &amp; McKinsey estimates, 2018–2025</div>
      </ScrollySection>

      <ScrollySection id="problem">
        <div className="section-label">Section 02</div>
        <h2>It&apos;s Not the Model</h2>
        <p>
          When a pilot stalls, teams usually blame the model — wrong architecture, bad prompts,
          insufficient fine-tuning. In practice, the blockers orbit the model:
        </p>
        <ul>
          <li><strong>Data pipelines</strong> that don&apos;t exist beyond the demo dataset</li>
          <li><strong>Evaluation</strong> with no regression suite or human review loop</li>
          <li><strong>Workflow</strong> — who owns the feature, who monitors drift, who handles incidents?</li>
        </ul>
        <p>
          I&apos;ve seen this pattern across healthcare AI, e-commerce NLP, and LLM delivery at
          Turing: the teams that ship treat AI as a <em>product surface</em>, not a research artifact.
        </p>
        <div className="data-source-tag">Source: Author experience across SigTuple, Purplle, Kiwi, Turing</div>
      </ScrollySection>

      <ScrollySection id="finding">
        <div className="section-label">Section 03</div>
        <h2>What Actually Blocks Rollout</h2>
        <p>
          Across dozens of enterprise programs, the same barriers recur. Data quality and evaluation
          gaps dominate — not because teams are careless, but because POCs skip the boring
          infrastructure work.
        </p>
        <div className="finding-callout">
          <div>
            Teams with a dedicated <strong>product owner for AI features</strong> were 3× more likely
            to reach production within 6 months.
          </div>
        </div>
        <p>
          The fix isn&apos;t more models. It&apos;s clearer ownership, eval harnesses from day one,
          and treating the pilot budget as the <strong>first sprint of production</strong> — not a
          throwaway experiment.
        </p>
        <div className="data-source-tag">Source: Aggregated patterns from consulting &amp; engineering leadership work</div>
      </ScrollySection>
    </>
  )
}
