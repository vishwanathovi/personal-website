/** Modern glassmorphism palette — purple discovery lane, teal production lane */
export const FLOW_COLORS = {
  purple: '#A78BFA',
  purpleGlow: 'rgba(167, 139, 250, 0.45)',
  purpleBg: 'rgba(88, 50, 140, 0.22)',
  teal: '#5EEAD4',
  tealGlow: 'rgba(94, 234, 212, 0.5)',
  tealBg: 'rgba(20, 80, 90, 0.25)',
  heroFrom: '#5EEAD4',
  heroTo: '#A7F3D0',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  feedback: '#FBBF24',
  pipe: 'rgba(255, 255, 255, 0.55)',
} as const

export type LifecycleStep = {
  id: string
  label: string
  bold?: boolean
  lane: 'discovery' | 'production'
  edgeLabel?: string
}

export const LIFECYCLE_STEPS: LifecycleStep[] = [
  { id: 'client', label: 'Client inputs', bold: true, lane: 'discovery' },
  { id: 'discover', label: 'Discovery', lane: 'discovery', edgeLabel: 'specs' },
  { id: 'clarify', label: 'Clarify', lane: 'discovery', edgeLabel: 'questions' },
  { id: 'design', label: 'Design', lane: 'discovery', edgeLabel: 'decisions' },
  { id: 'setup', label: 'Setup', lane: 'production', edgeLabel: 'guidelines' },
  { id: 'produce', label: 'Produce', lane: 'production', edgeLabel: 'validation' },
  { id: 'deliver', label: 'Deliver', bold: true, lane: 'production', edgeLabel: 'reviews' },
]

export type ClusterTheme = 'blue' | 'amber' | 'teal' | 'rose' | 'purple' | 'hero'

export type KnowledgeNode = {
  id: string
  label: string
}

export type KnowledgeCluster = {
  id: string
  title: string
  theme: ClusterTheme
  grid: { col: number; row: number }
  nodes: KnowledgeNode[]
}

export const KNOWLEDGE_HUB = {
  id: 'project-knowledge',
  label: 'Project Knowledge',
} as const

export const KNOWLEDGE_CLUSTERS: KnowledgeCluster[] = [
  {
    id: 'client-comm',
    title: 'Client communication',
    theme: 'blue',
    grid: { col: 1, row: 1 },
    nodes: [
      { id: 'documents', label: 'Documents' },
      { id: 'calls', label: 'Calls' },
      { id: 'email', label: 'Email' },
      { id: 'slack', label: 'Slack' },
      { id: 'sample-reviews', label: 'Sample reviews' },
    ],
  },
  {
    id: 'delivery-mgmt',
    title: 'Delivery management',
    theme: 'amber',
    grid: { col: 2, row: 1 },
    nodes: [
      { id: 'decisions', label: 'Decisions' },
      { id: 'assumptions', label: 'Assumptions' },
      { id: 'timelines', label: 'Timelines' },
      { id: 'risk-registers', label: 'Risk registers' },
      { id: 'client-updates', label: 'Client updates' },
    ],
  },
  {
    id: 'production',
    title: 'Production operations',
    theme: 'teal',
    grid: { col: 3, row: 1 },
    nodes: [
      { id: 'trainer-questions', label: 'Trainer questions' },
      { id: 'team-lead-guidance', label: 'Team-lead guidance' },
      { id: 'task-assignments', label: 'Task assignments' },
      { id: 'qualification-results', label: 'Qualification results' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality operations',
    theme: 'rose',
    grid: { col: 1, row: 3 },
    nodes: [
      { id: 'reviewer-feedback', label: 'Reviewer feedback' },
      { id: 'error-taxonomies', label: 'Error taxonomies' },
      { id: 'calibration-notes', label: 'Calibration notes' },
      { id: 'rework-reasons', label: 'Rework reasons' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical systems',
    theme: 'purple',
    grid: { col: 2, row: 3 },
    nodes: [
      { id: 'validation-scripts', label: 'Validation scripts' },
      { id: 'trackers', label: 'Trackers' },
      { id: 'dashboards', label: 'Dashboards' },
      { id: 'schema-versions', label: 'Schema versions' },
    ],
  },
  {
    id: 'outputs',
    title: 'Final outputs',
    theme: 'hero',
    grid: { col: 3, row: 3 },
    nodes: [
      { id: 'delivered-dataset', label: 'Delivered dataset' },
      { id: 'quality-report', label: 'Quality report' },
      { id: 'client-signoff', label: 'Client sign-off' },
    ],
  },
]

export type PipelineSourceIcon = 'doc' | 'call' | 'message' | 'sample' | 'tracker' | 'code' | 'decision'

export type PipelineSource = {
  id: string
  label: string
  icon: PipelineSourceIcon
  theme: 'blue' | 'amber' | 'teal' | 'rose' | 'purple'
}

export const PIPELINE_SOURCES: PipelineSource[] = [
  { id: 'docs', label: 'Docs', icon: 'doc', theme: 'blue' },
  { id: 'calls', label: 'Calls', icon: 'call', theme: 'blue' },
  { id: 'messages', label: 'Messages', icon: 'message', theme: 'teal' },
  { id: 'samples', label: 'Samples', icon: 'sample', theme: 'amber' },
  { id: 'trackers', label: 'Trackers', icon: 'tracker', theme: 'purple' },
  { id: 'code', label: 'Code', icon: 'code', theme: 'purple' },
  { id: 'decisions', label: 'Human decisions', icon: 'decision', theme: 'amber' },
]

export const PIPELINE_STORAGE = {
  label: 'Central Storage',
  subtitle: 'Raw artifact lake',
} as const

export const PIPELINE_STORAGE_NOTE =
  'The most important store in the stack. As agents improve, later stages will automate — but only if everything is captured here reliably.'

export const PIPELINE_STAGES = [
  { id: 'ingest', label: 'Ingestion' },
  { id: 'parse', label: 'Transcription & parsing' },
  { id: 'classify', label: 'Classification' },
  { id: 'extract', label: 'Entity & decision extraction' },
  { id: 'dedupe', label: 'Deduplication' },
  { id: 'link', label: 'Version linking' },
  { id: 'approve', label: 'Approval status' },
] as const

export const KNOWLEDGE_STORE = {
  title: 'Project Knowledge Store',
  compartments: [
    'Requirements',
    'Decisions',
    'Questions',
    'Guidelines',
    'Examples',
    'Metrics',
    'Changes',
    'Outcomes',
  ],
} as const

export const SOURCE_ICON_COLORS: Record<PipelineSourceIcon, string> = {
  doc: '#60A5FA',
  call: '#60A5FA',
  message: '#5EEAD4',
  sample: '#FBBF24',
  tracker: '#A78BFA',
  code: '#A78BFA',
  decision: '#FBBF24',
}

export type LayerTheme = 'muted' | 'blue' | 'teal' | 'purple' | 'amber' | 'hero'

export type KnowledgeLayer = {
  id: string
  label: string
  theme: LayerTheme
}

export const AUTHORITY_LAYERS: KnowledgeLayer[] = [
  { id: 'raw', label: 'Raw sources', theme: 'muted' },
  { id: 'extracted', label: 'Extracted information', theme: 'blue' },
  { id: 'structured', label: 'Structured project entities', theme: 'teal' },
  { id: 'versioned', label: 'Versioned artifacts', theme: 'purple' },
  { id: 'approved', label: 'Approved operational truth', theme: 'amber' },
  { id: 'roles', label: 'Role-specific AI access', theme: 'hero' },
]

export const ROLE_ASSISTANTS = [
  { id: 'trainer', label: 'Trainer assistant' },
  { id: 'reviewer', label: 'Reviewer assistant' },
  { id: 'team-lead', label: 'Team-lead assistant' },
  { id: 'delivery-mgr', label: 'Delivery-manager assistant' },
  { id: 'client-report', label: 'Client reporting assistant' },
] as const

export type HistoryStepStatus = 'superseded' | 'current' | 'neutral'

export type RequirementHistoryStep = {
  id: string
  label: string
  status: HistoryStepStatus
  meta?: string
}

export type RequirementHistory = {
  id: string
  label: string
  steps: RequirementHistoryStep[]
}

export const REQUIREMENT_HISTORIES: RequirementHistory[] = [
  {
    id: 'error-tolerance',
    label: 'Error tolerance rule',
    steps: [
      { id: 'v1', label: 'Requirement v1', status: 'superseded', meta: 'Client doc · draft' },
      { id: 'clarify', label: 'Client clarification', status: 'neutral', meta: 'Call · noted' },
      { id: 'interpret', label: 'Internal interpretation', status: 'superseded', meta: 'Assumption' },
      { id: 'guideline-v2', label: 'Guideline v2', status: 'neutral', meta: 'Internal · versioned' },
      { id: 'approved', label: 'Client-approved revision', status: 'current', meta: 'Approved · effective' },
      { id: 'validation', label: 'Validation rule update', status: 'neutral', meta: 'Linked artifact' },
    ],
  },
  {
    id: 'output-schema',
    label: 'Output schema',
    steps: [
      { id: 'sample-v1', label: 'Sample format v1', status: 'superseded', meta: 'Client sample' },
      { id: 'question', label: 'Clarification question', status: 'neutral', meta: 'Slack thread' },
      { id: 'schema-v2', label: 'Schema v2', status: 'current', meta: 'Client-approved' },
    ],
  },
  {
    id: 'qual-threshold',
    label: 'Qualification threshold',
    steps: [
      { id: 'initial', label: 'Initial rubric draft', status: 'superseded', meta: 'Internal' },
      { id: 'calibration', label: 'Calibration notes', status: 'neutral', meta: 'Reviewer session' },
      { id: 'threshold', label: 'Approved threshold', status: 'current', meta: 'Signed off' },
    ],
  },
]

export type ScatteredPrompt = {
  id: string
  label: string
  outputPreview: string
  outputStyle: 'bullets' | 'prose' | 'table' | 'numbered'
  offset: { x: number; rotate: number }
}

export const SCATTERED_PROMPTS: ScatteredPrompt[] = [
  {
    id: 'summarise',
    label: 'Summarise this document',
    outputPreview: '• Key point A\n• Key point B\n• …',
    outputStyle: 'bullets',
    offset: { x: -4, rotate: -2.5 },
  },
  {
    id: 'guidelines',
    label: 'Write trainer guidelines',
    outputPreview: 'Long unstructured paragraph with no schema…',
    outputStyle: 'prose',
    offset: { x: 6, rotate: 1.8 },
  },
  {
    id: 'missing-req',
    label: 'Find missing requirements',
    outputPreview: 'Field | Status\n──────|──────\n??? | ???',
    outputStyle: 'table',
    offset: { x: -2, rotate: -1.2 },
  },
  {
    id: 'validation',
    label: 'Create validation checks',
    outputPreview: '1. Check something\n2. Maybe another\n3. …',
    outputStyle: 'numbered',
    offset: { x: 5, rotate: 2.2 },
  },
]

export const SKILL_BUILDER_COMPONENTS = [
  'Instructions',
  'Inputs',
  'Examples',
  'Constraints',
  'Output schema',
  'Evaluation',
  'Human approval',
] as const

export const REUSABLE_SKILLS = [
  { id: 'req-synthesis', label: 'Requirement synthesis' },
  { id: 'gap-analysis', label: 'Gap analysis' },
  { id: 'guidelines', label: 'Guideline generation' },
  { id: 'rubrics', label: 'Rubric design' },
  { id: 'validation', label: 'Validation generation' },
  { id: 'workflow', label: 'Workflow planning' },
] as const

export type LaunchPipelineStage = {
  id: string
  label: string
  shortLabel: string
  aiAction: string
  humanAction: string
  outputCreated: string
  approvalRequired: string
  packageAdds: string[]
}

export const LAUNCH_PIPELINE_STAGES: LaunchPipelineStage[] = [
  {
    id: 'ingest',
    label: 'Ingest client inputs',
    shortLabel: 'Ingest inputs',
    aiAction: 'Parse documents, samples, calls, and trackers into a source inventory',
    humanAction: 'Confirm access, classify sources, and flag missing material',
    outputCreated: 'Indexed client input catalogue',
    approvalRequired: 'Source catalogue review',
    packageAdds: ['Client documents', 'Sample data', 'Call transcripts', 'Trackers'],
  },
  {
    id: 'brief',
    label: 'Generate project brief',
    shortLabel: 'Project brief',
    aiAction: 'Synthesise objectives, scope, constraints, and open questions',
    humanAction: 'Review assumptions and correct misread client language',
    outputCreated: 'Structured project brief v1',
    approvalRequired: 'Delivery-manager review',
    packageAdds: ['Project brief'],
  },
  {
    id: 'gaps',
    label: 'Detect requirement gaps',
    shortLabel: 'Detect gaps',
    aiAction: 'Compare sources for contradictions, missing fields, and risks',
    humanAction: 'Validate gap severity and prioritise clarifications',
    outputCreated: 'Gap register and risk flags',
    approvalRequired: 'Team-lead sign-off',
    packageAdds: ['Gap register', 'Risk flags'],
  },
  {
    id: 'questions',
    label: 'Prepare client questions',
    shortLabel: 'Client questions',
    aiAction: 'Draft discovery agenda and targeted clarification questions',
    humanAction: 'Edit tone, remove noise, and approve call plan',
    outputCreated: 'Discovery agenda and question set',
    approvalRequired: 'Client-facing review',
    packageAdds: ['Discovery agenda', 'Clarification questions'],
  },
  {
    id: 'answers',
    label: 'Incorporate approved answers',
    shortLabel: 'Approved answers',
    aiAction: 'Map client decisions to requirement versions and change log',
    humanAction: 'Approve which answers govern production',
    outputCreated: 'Approved requirement revision',
    approvalRequired: 'Client-approved decisions',
    packageAdds: ['Approved requirements', 'Decision log'],
  },
  {
    id: 'documents',
    label: 'Generate operating documents',
    shortLabel: 'Operating docs',
    aiAction: 'Produce trainer guidelines, reviewer guidelines, rubrics, and qual tests',
    humanAction: 'Edit examples, calibrate rubrics, and verify coverage',
    outputCreated: 'Operating document draft set',
    approvalRequired: 'Functional owner review',
    packageAdds: ['Trainer guidelines', 'Reviewer guidelines', 'Rubrics', 'Qualification tests'],
  },
  {
    id: 'approval',
    label: 'Human approval',
    shortLabel: 'Human approval',
    aiAction: 'Package artifacts with traceability and approval checklist',
    humanAction: 'Sign off launch package before production unlock',
    outputCreated: 'Signed launch approval pack',
    approvalRequired: 'Required — production gate',
    packageAdds: ['Signed approval pack'],
  },
  {
    id: 'readiness',
    label: 'Production readiness',
    shortLabel: 'Production ready',
    aiAction: 'Generate trackers, validation rules, and readiness checklist',
    humanAction: 'Confirm staffing, tooling, and go-live criteria',
    outputCreated: 'Production-ready operating package',
    approvalRequired: 'Delivery-manager go-live',
    packageAdds: ['Production trackers', 'Validation rules', 'Readiness checklist'],
  },
]

export type CopilotRoleId = 'trainer' | 'reviewer' | 'team-lead' | 'delivery-manager'

export type CopilotMockLine = {
  text: string
  kind: 'prompt' | 'ai' | 'human' | 'citation' | 'metric'
}

export type CopilotRole = {
  id: CopilotRoleId
  label: string
  theme: 'teal' | 'blue' | 'purple' | 'amber'
  questionsReceived: string
  knowledgeAccessed: string
  aiAssistance: string
  humanDecision: string
  dataReturned: string
  mockTitle: string
  mockLines: CopilotMockLine[]
}

export const PRODUCTION_COPILOT_ROLES: CopilotRole[] = [
  {
    id: 'trainer',
    label: 'Trainer',
    theme: 'teal',
    questionsReceived: 'Edge-case labelling questions',
    knowledgeAccessed: 'Approved trainer guidelines & examples',
    aiAssistance: 'Cited answer draft with confidence flag',
    humanDecision: 'Trainer accepts, edits, or escalates',
    dataReturned: 'New FAQ candidate & confusion signal',
    mockTitle: 'Trainer copilot — Q&A',
    mockLines: [
      { text: 'How should I label overlapping entities in row 42?', kind: 'prompt' },
      { text: 'Guideline §3.2 + Example pack B support a single primary label.', kind: 'ai' },
      { text: 'Source: Trainer guideline v4 · approved 12 Mar', kind: 'citation' },
      { text: 'Trainer confirms answer and continues task', kind: 'human' },
    ],
  },
  {
    id: 'reviewer',
    label: 'Reviewer',
    theme: 'blue',
    questionsReceived: 'Rubric scoring & feedback requests',
    knowledgeAccessed: 'Reviewer rubric & error taxonomy',
    aiAssistance: 'Violation highlights & draft feedback',
    humanDecision: 'Reviewer sets final score & disposition',
    dataReturned: 'Calibration note & recurring error tag',
    mockTitle: 'Reviewer copilot — assessment',
    mockLines: [
      { text: 'Flagged: missing justification on criterion 2', kind: 'ai' },
      { text: 'Draft feedback: cite rubric example 7 for acceptable phrasing', kind: 'ai' },
      { text: 'Reviewer approves score 3/5 with edited feedback', kind: 'human' },
      { text: 'Pattern logged: justification gaps in batch 18', kind: 'metric' },
    ],
  },
  {
    id: 'team-lead',
    label: 'Team lead',
    theme: 'purple',
    questionsReceived: 'Escalations & batch-quality questions',
    knowledgeAccessed: 'Team queue, guidelines, recent decisions',
    aiAssistance: 'Clustered confusion themes across trainers',
    humanDecision: 'Lead issues guidance or requests guideline update',
    dataReturned: 'Guidance broadcast & escalation record',
    mockTitle: 'Team-lead copilot — triage',
    mockLines: [
      { text: '12 trainers asked about boundary cases in the last 4h', kind: 'ai' },
      { text: 'Cluster: entity overlap after schema v2 change', kind: 'metric' },
      { text: 'Lead posts approved interim rule to team channel', kind: 'human' },
      { text: 'Escalation opened for guideline clarification', kind: 'citation' },
    ],
  },
  {
    id: 'delivery-manager',
    label: 'Delivery manager',
    theme: 'amber',
    questionsReceived: 'Progress, risk, and client-update queries',
    knowledgeAccessed: 'Trackers, quality metrics, change log',
    aiAssistance: 'Risk narrative linking metrics to events',
    humanDecision: 'Manager approves client message & interventions',
    dataReturned: 'Client update & operational decision log',
    mockTitle: 'Delivery-manager copilot — control view',
    mockLines: [
      { text: 'Throughput −14% coincides with guideline v3 rollout', kind: 'ai' },
      { text: 'Suggested narrative: calibration + trainer FAQ pending', kind: 'ai' },
      { text: 'Manager approves client status note & staffing tweak', kind: 'human' },
      { text: 'Decision logged with linked metric snapshot', kind: 'citation' },
    ],
  },
]

export const LEARNING_FLYWHEEL_STAGES = [
  { id: 'execute', label: 'Execute project', shortLabel: 'Execute' },
  { id: 'capture', label: 'Capture operational data', shortLabel: 'Capture' },
  { id: 'evaluate', label: 'Evaluate outcomes', shortLabel: 'Evaluate' },
  { id: 'extract', label: 'Extract reusable lessons', shortLabel: 'Extract' },
  { id: 'improve', label: 'Improve skills and templates', shortLabel: 'Improve' },
  { id: 'launch', label: 'Launch next project more effectively', shortLabel: 'Launch' },
] as const

export const FLYWHEEL_SKILL_MODULES = [
  { id: 'req-synthesis', label: 'Requirement synthesis' },
  { id: 'gap-analysis', label: 'Gap analysis' },
  { id: 'guidelines', label: 'Guideline generation' },
  { id: 'rubrics', label: 'Rubric design' },
  { id: 'validation', label: 'Validation generation' },
  { id: 'workflow', label: 'Workflow planning' },
] as const

export type MaturityLevel = {
  id: string
  label: string
  shortLabel: string
  primaryCapability: string
  requiredFoundation: string
  exampleUseCase: string
  successMetric: string
  governanceRequirement: string
}

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    id: 'capture',
    label: 'Level 1 — Capture',
    shortLabel: 'Capture',
    primaryCapability: 'Reliably record documents, calls, decisions, and delivery metrics',
    requiredFoundation: 'Defined source types, storage permissions, and minimum metadata schema',
    exampleUseCase: 'Discovery call transcript and client deck land in governed project storage',
    successMetric: '≥95% of project artifacts captured with source, owner, and timestamp',
    governanceRequirement: 'Retention policy, access controls, and PII handling rules',
  },
  {
    id: 'retrieve',
    label: 'Level 2 — Retrieve',
    shortLabel: 'Retrieve',
    primaryCapability: 'Answer project questions grounded in approved, versioned sources',
    requiredFoundation: 'Indexed knowledge store with authority hierarchy from Level 1',
    exampleUseCase: 'Delivery manager asks which requirement version governs a disputed edge case',
    successMetric: 'Retrieval answers cite approved sources; hallucination rate below agreed threshold',
    governanceRequirement: 'Source-of-truth labels and superseded-version suppression',
  },
  {
    id: 'assist',
    label: 'Level 3 — Assist',
    shortLabel: 'Assist',
    primaryCapability: 'Draft briefs, guidelines, rubrics, and validation specs for human edit',
    requiredFoundation: 'Reliable retrieval plus approved templates and skill definitions',
    exampleUseCase: 'AI proposes trainer guideline v1 from requirements; SME edits and approves',
    successMetric: 'Draft acceptance rate and time-to-first-approved artifact vs baseline',
    governanceRequirement: 'Human approval before any draft becomes production authority',
  },
  {
    id: 'integrate',
    label: 'Level 4 — Integrate',
    shortLabel: 'Integrate',
    primaryCapability: 'Embed assistance inside trainer, reviewer, and manager workflows',
    requiredFoundation: 'Approved skills, role permissions, and production tooling hooks',
    exampleUseCase: 'Trainer copilot surfaces cited guidance inside the annotation interface',
    successMetric: 'Assisted-task completion time and escalation volume per role',
    governanceRequirement: 'Role-scoped access; AI recommendations never bypass human sign-off',
  },
  {
    id: 'orchestrate',
    label: 'Level 5 — Orchestrate',
    shortLabel: 'Orchestrate',
    primaryCapability: 'Chain governed skills into coordinated multi-step delivery workflows',
    requiredFoundation: 'Integrated copilots, workflow contracts, and cross-skill traceability',
    exampleUseCase: 'Requirement change triggers gap scan, doc updates, and readiness checklist',
    successMetric: 'End-to-end workflow success rate and mean time to propagate approved changes',
    governanceRequirement: 'Workflow gates, audit trail, and rollback for each orchestrated step',
  },
  {
    id: 'learn',
    label: 'Level 6 — Learn',
    shortLabel: 'Learn',
    primaryCapability: 'Extract approved lessons and improve future project launch and production',
    requiredFoundation: 'Orchestrated operations producing structured outcome and decision data',
    exampleUseCase: 'Retrospective feeds anonymised patterns into skill modules for the next launch',
    successMetric: 'Repeat setup time, documentation consistency, and pilot-to-scale conversion',
    governanceRequirement: 'Anonymisation review, lesson approval board, and confidential-data firewall',
  },
]

export const ARCHITECTURE_FLOW_STAGES = [
  { id: 'inputs', label: 'Client Inputs', shortLabel: 'Inputs' },
  { id: 'collection', label: 'Information Collection', shortLabel: 'Collection' },
  { id: 'knowledge', label: 'Governed Project Knowledge', shortLabel: 'Knowledge' },
  { id: 'skills', label: 'Reusable AI Skills', shortLabel: 'Skills' },
  { id: 'workflows', label: 'Human-Approved Workflows', shortLabel: 'Workflows' },
  { id: 'production', label: 'AI-Assisted Production', shortLabel: 'Production' },
  { id: 'quality', label: 'Quality and Delivery', shortLabel: 'Quality' },
  { id: 'learning', label: 'Retrospective Learning', shortLabel: 'Learning' },
] as const

export const ARCHITECTURE_ROLES = [
  { id: 'client', label: 'Client' },
  { id: 'delivery-manager', label: 'Delivery manager' },
  { id: 'team-lead', label: 'Team lead' },
  { id: 'trainer', label: 'Trainer' },
  { id: 'reviewer', label: 'Reviewer' },
  { id: 'engineering', label: 'Engineering & automation' },
  { id: 'quality-lead', label: 'Quality leadership' },
] as const

export const ARCHITECTURE_SYSTEMS = [
  { id: 'comms', label: 'Communication integrations', shortLabel: 'Comms' },
  { id: 'storage', label: 'Knowledge storage', shortLabel: 'Storage' },
  { id: 'versions', label: 'Version & approval system', shortLabel: 'Versions' },
  { id: 'skills-registry', label: 'Skill registry', shortLabel: 'Skills' },
  { id: 'workflow-engine', label: 'Workflow engine', shortLabel: 'Workflows' },
  { id: 'validation', label: 'Validation engine', shortLabel: 'Validation' },
  { id: 'analytics', label: 'Operational analytics', shortLabel: 'Analytics' },
  { id: 'audit', label: 'Audit log', shortLabel: 'Audit' },
] as const
