import { ScrollySection } from '../../../scrolly/ScrollySection'

export function AiNativeDeliverySections() {
  return (
    <>
      <ScrollySection id="delivery-machine">
        <div className="section-label">Section 01</div>
        <h2>The Delivery Machine We Already Build</h2>
        <p>
          A data-delivery project rarely begins with a perfectly complete specification. A client may provide
          requirement documents, sample data, evaluation criteria, expected output formats, and an initial
          statement of work — yet these materials rarely answer every operational question required to run
          production at scale.
        </p>
        <p>
          The delivery team still needs to understand what the client is ultimately trying to achieve: which
          errors are unacceptable, which quality dimensions matter most, how ambiguous examples should be handled,
          and which instructions are fixed versus still evolving. Answers emerge through calls, written
          conversations, sample reviews, pilot deliveries, and repeated clarification.
        </p>
        <p>
          The team then translates this evolving understanding into an internal operating model — trainer and
          reviewer guidelines, qualification tests, validation rules, trackers, escalation paths, and staffing plans.
          Once production begins, the system expands further: trainers, reviewers, team leads, delivery managers,
          and client stakeholders each need visibility and reliable workflows.
        </p>
        <p>
          <strong>This is not simply an annotation workflow.</strong> It is a temporary production organisation
          assembled around a specific data objective. And today, much of that organisation is built manually for
          each project.
        </p>
        <div className="data-source-tag">Delivery lifecycle · Turing-scale annotation programs</div>
      </ScrollySection>

      <ScrollySection id="invisible-knowledge">
        <div className="section-label">Section 02</div>
        <h2>The Most Valuable Project Data Is Often Invisible</h2>
        <p>
          A project leaves behind an obvious output: the delivered dataset. But the project also creates a large
          body of operational knowledge — why a requirement was interpreted a particular way, which questions the
          specification failed to answer, which examples caused trainer confusion, which validation rules caught
          meaningful errors, and which guideline changes improved quality.
        </p>
        <p>
          This knowledge exists, but it is usually fragmented across client documents, call recordings, Slack
          threads, spreadsheet comments, validation scripts, and the memory of individual delivery managers or
          reviewers.
        </p>
        <p>
          The result is a form of organisational amnesia. When a similar project arrives later, the organisation
          may remember it has solved a comparable problem before, but it cannot systematically retrieve the
          decisions that mattered, the mistakes that consumed the most time, or the conditions under which
          solutions were effective.
        </p>
        <div className="finding-callout">
          <div>
            Before asking AI to <strong>operate</strong> a project, ensure the project produces
            machine-usable organisational memory.
          </div>
        </div>
        <div className="data-source-tag">Operational knowledge · Cross-project patterns</div>
      </ScrollySection>

      <ScrollySection id="capture-before-automation">
        <div className="section-label">Section 03</div>
        <h2>Capture Before You Automate</h2>
        <p>
          Enterprise AI programmes often begin by identifying tasks that appear easy to automate — generate a
          document, summarise a call, answer a trainer question. These are valuable, but automating them in
          isolation produces disconnected assistants rather than a coherent delivery system.
        </p>
        <p>
          An assistant that generates trainer guidelines from one document may miss a clarification made during a
          client call. A trainer chatbot may answer using an outdated guideline. The underlying problem is not
          model capability — <strong>it is fragmented context.</strong>
        </p>
        <p>
          The first phase of AI adoption should focus on creating a comprehensive project record. Before production,
          capture client requirements, samples, meeting transcripts, and approved answers. During production,
          capture trainer questions, guideline changes, quality metrics, and rejection reasons. After production,
          capture outcomes, bottlenecks, and retrospective conclusions.
        </p>
        <p>Only then can AI reliably help operate the project.</p>
        <div className="data-source-tag">Information architecture · Governed capture design</div>
      </ScrollySection>

      <ScrollySection id="ground-truth">
        <div className="section-label">Section 04</div>
        <h2>A Knowledge Store Is Not Automatically a Source of Truth</h2>
        <p>
          A project may contain multiple statements about the same requirement: an early client document, a call
          clarification, a provisional internal interpretation, an updated guideline, and a final client-approved
          decision. These cannot be treated as equally authoritative.
        </p>
        <p>
          Every important piece of information should carry metadata: source, date, approval status, effective date,
          superseded status, and access classification. The system must distinguish client-approved requirements,
          internally approved decisions, temporary assumptions, unresolved questions, and superseded instructions.
        </p>
        <p>
          A trainer asking a question should receive the <strong>current approved instruction</strong>, not the
          most semantically similar message. AI systems become trustworthy when they understand which data should
          govern a decision.
        </p>
        <div className="data-source-tag">Version governance · Approval hierarchy</div>
      </ScrollySection>

      <ScrollySection id="skills-not-prompts">
        <div className="section-label">Section 05</div>
        <h2>Build Skills, Not a Collection of Prompts</h2>
        <p>
          Across data-delivery projects, teams repeatedly perform activities: synthesising requirements, creating
          trainer and reviewer guidelines, designing rubrics, generating qualification tests, defining validation
          checks, and conducting retrospectives. These should become <strong>reusable organisational skills</strong>,
          not isolated prompts.
        </p>
        <p>
          A production-grade skill defines its purpose, required inputs, authoritative sources, output schema,
          validation rules, approval requirements, escalation conditions, and failure behaviour.
        </p>
        <p>
          A requirement-synthesis skill should extract client objectives, schemas, evaluation criteria, assumptions,
          risks, and open questions — citing project sources, separating facts from assumptions, and highlighting
          contradictions rather than silently resolving them.
        </p>
        <div className="finding-callout">
          <div>Prompts help individuals complete tasks. <strong>Skills</strong> allow an organisation to standardise how work is performed.</div>
        </div>
        <div className="data-source-tag">Skill registry · Schema-first AI capabilities</div>
      </ScrollySection>

      <ScrollySection id="project-launch">
        <div className="section-label">Section 06</div>
        <h2>The First AI-Assisted Moment: Project Launch</h2>
        <p>
          The earliest phase contains high-value, highly repetitive work. Delivery managers gather documents, attend
          calls, inspect samples, and translate client language into an internal operating plan.
        </p>
        <p>
          When a new project begins, the system could ingest available material and create an initial project brief —
          identifying ambiguities, contradictions, and risks. Before a client call, it could produce a discovery
          agenda. After the call, it could propose structured updates showing exactly which sections changed.
        </p>
        <p>
          The result is not an autonomous project manager but a <strong>decision-support system</strong> that reduces
          manual reconciliation. The human team remains responsible for approval, but begins from a structured,
          traceable starting point rather than an empty document.
        </p>
        <div className="data-source-tag">Project launch · Discovery-to-readiness pipeline</div>
      </ScrollySection>

      <ScrollySection id="production-copilots">
        <div className="section-label">Section 07</div>
        <h2>AI at the Point of Production</h2>
        <p>
          Once production begins, hundreds of small decisions determine dataset quality. AI can assist each role,
          but each requires a different interface and level of authority.
        </p>
        <p>
          <strong>Trainer copilot</strong> — answers using approved guidelines and examples; cites sources; escalates
          when uncertain. <strong>Reviewer copilot</strong> — highlights rubric violations and drafts feedback; human
          retains final judgement. <strong>Team-lead copilot</strong> — aggregates questions to detect project-level
          confusion. <strong>Delivery-manager copilot</strong> — connects progress, quality trends, and risk
          narratives rather than isolated metrics.
        </p>
        <div className="finding-callout">
          <div>Never visually imply the AI independently owns the final decision — human approval remains explicit.</div>
        </div>
        <div className="data-source-tag">Role-based assistance · Production workflows</div>
      </ScrollySection>

      <ScrollySection id="human-governance">
        <div className="section-label">Section 08</div>
        <h2>Automation Without Governance Would Scale the Wrong Things</h2>
        <p>
          The objective is not to automate every project decision. AI is well suited to searching information,
          drafting documents, detecting patterns, and estimating impacts. Humans remain responsible for agreeing
          scope, approving guidelines, resolving genuinely ambiguous cases, and accepting delivery risk.
        </p>
        <p>
          Every skill should define whether its output is informational, advisory, draft, approval-required, or
          automatically executable. The system requires project isolation — client information must not leak across
          projects. Cross-project learning uses anonymised patterns and approved templates, not confidential content.
        </p>
        <p>
          AI adoption in delivery must be designed as an <strong>auditable operating system</strong>, not an invisible
          layer of automation.
        </p>
        <div className="data-source-tag">Governance · Audit trail · Role-based access</div>
      </ScrollySection>

      <ScrollySection id="cross-project-intelligence">
        <div className="section-label">Section 09</div>
        <h2>Every Project Should Improve the Next One</h2>
        <p>
          After tens of projects, the organisation accumulates patterns: requirement gaps that cause delays, guideline
          structures associated with lower error rates, validation checks that generalise, and operational interventions
          that improve throughput.
        </p>
        <p>
          Maintain a clear distinction between <strong>project-specific knowledge</strong> (confidential requirements,
          client data, individual performance) and <strong>reusable organisational knowledge</strong> (workflow patterns,
          skill definitions, anonymised lessons).
        </p>
        <p>
          A new project would not begin from zero — the system recommends relevant discovery questions, reusable
          guideline sections, likely risks, and suitable monitoring metrics, reflecting accumulated experience rather
          than whoever happens to be assigned.
        </p>
        <div className="data-source-tag">Compounding intelligence · Anonymised cross-project learning</div>
      </ScrollySection>

      <ScrollySection id="maturity-path">
        <div className="section-label">Section 10</div>
        <h2>The Path to an AI-Native Delivery Organisation</h2>
        <p>This transformation should progress through measurable stages:</p>
        <ul>
          <li><strong>Level 1 — Capture:</strong> reliably record documents, calls, decisions, and metrics.</li>
          <li><strong>Level 2 — Retrieve:</strong> ask project questions grounded in approved sources.</li>
          <li><strong>Level 3 — Assist:</strong> draft briefs, guidelines, rubrics, and validation specs.</li>
          <li><strong>Level 4 — Integrate:</strong> embed assistance in trainer, reviewer, and manager workflows.</li>
          <li><strong>Level 5 — Orchestrate:</strong> connect governed skills into coordinated workflows.</li>
          <li><strong>Level 6 — Learn:</strong> extract approved lessons and improve future delivery.</li>
        </ul>
        <p>
          The correct pilot has a clearly defined workflow, sufficient documentation, measurable quality outcomes,
          and a team willing to document decisions consistently — evaluating setup time, documentation consistency,
          validation coverage, and delivery-manager visibility before expanding scope.
        </p>
        <div className="data-source-tag">Adoption roadmap · Pilot selection criteria</div>
      </ScrollySection>

      <ScrollySection id="future-state">
        <div className="section-label">Section 11</div>
        <h2>The Future State: Delivery as a Learning System</h2>
        <p>
          Imagine a new project entering Turing. The client uploads requirements and samples. The system creates a
          structured brief, supports the discovery call, and generates draft operating documents for human approval.
          Production begins with role-appropriate assistance grounded in current approved guidelines.
        </p>
        <p>
          When the client changes a requirement, the system identifies every affected artifact. When reviewers
          discover a recurring failure mode, the system proposes validation and guideline updates. When the project
          ends, the retrospective draws on recorded decisions, changes, and outcomes — not reconstructed memory.
        </p>
        <p>
          <strong>AI should not merely accelerate annotation.</strong> It should help transform delivery from a
          sequence of manually reconstructed projects into a learning system — where every decision has context,
          every artifact has a history, every role has appropriate assistance, and every completed project makes
          the organisation better prepared for the next one.
        </p>
        <div className="data-source-tag">Future architecture · Human-governed delivery intelligence</div>
      </ScrollySection>
    </>
  )
}
