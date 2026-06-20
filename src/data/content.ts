/**
 * Portfolio content — Vishwanatha HM
 * Edit this file to update copy, links, and section data.
 */

export const site = {
  name: 'Vishwanatha HM',
  title: 'AI Technology Leader',
  bio: '10+ years shipping ML and AI systems. I help companies adopt AI — strategy to production.',
  heroHighlights: [
    'Leading 30+ engineers building AI infrastructure at Turing',
    'Shipped NLP systems, LLM pipelines, and recommendation engines at scale',
    'Available for consulting: AI adoption, evaluation, delivery',
  ],
  availabilityNote: 'Open to consulting engagements ($100–200/hr)',
  location: 'India',
  totalExperience: '10+ years',
  /** Served from `public/vishwa-headshot.PNG` */
  profileImage: '/vishwa-headshot.PNG',
  profileImageAlt: 'Vishwanatha HM — professional portrait',
  primaryCta: { label: 'See my work', href: '#projects' },
  secondaryCta: { label: 'Get in touch', href: '#connect' },
  /** Shown above primary CTAs with brand marks */
  heroTrustedByLabel: "Clients I've worked with",
} as const

export const contact = {
  email: 'vishwanathovi@gmail.com',
  phoneDisplay: '+91 97439 11883',
  phoneTel: '+919743911883',
} as const

export type TimelineEntry = {
  id: string
  role: string
  company: string
  /** e.g. product or program name */
  productContext?: string
  location?: string | null
  duration: string
  /** Short intro when bullets are used */
  summary?: string
  description?: string
  bullets?: string[]
}

export const careerSection = {
  eyebrow: 'Experience',
  title: 'From data to LLMs — building AI that ships',
  subtitle:
    '10+ years turning ML ideas into production systems. End-to-end ownership across strategy, team-building, and delivery.',
} as const

export const timeline: TimelineEntry[] = [
  {
    id: '1',
    role: 'Engineering Manager · AI Infrastructure',
    company: 'Turing',
    duration: 'Dec 2022 — Present',
    bullets: [
      'Technology leader for AI infrastructure at a leading US AI company',
      'Built and scaled LLM training data platforms from the ground up',
      'Grew and led a team of 30+ engineers across delivery, tooling, and operations',
      'Drove AI adoption: automated and human-in-the-loop pipelines for LLM data and evaluation',
    ],
  },
  {
    id: '2',
    role: 'SDE 3 — Machine Learning',
    company: 'Purplle',
    duration: 'Apr 2021 — Aug 2022',
    bullets: [
      'Brought NLP to production for a 7M-user e-commerce platform',
      'Built end-to-end: annotation, model training, search understanding, and NER pipelines',
      'Designed data ingestion systems connecting multiple external sources',
    ],
  },
  {
    id: '3',
    role: 'SDE — Machine Learning',
    company: 'Kiwi',
    duration: 'Sep 2019 — Jun 2020',
    bullets: [
      'Deployed ML recommendation engine (AWS Personalize) to production',
      '+20% engagement and +30% retention after rollout',
      'Built push notification system to optimize user re-engagement',
    ],
  },
  {
    id: '4',
    role: 'Sabbatical — Builder',
    company: 'Independent',
    duration: 'May 2018 — Jun 2019',
    bullets: [
      'Learned full-stack engineering from scratch (MERN stack)',
      'Built and shipped full-scale React and Node.js applications',
      'Focused on systems thinking and building end-to-end products',
    ],
  },
  {
    id: '5',
    role: 'Associate Product Manager',
    company: 'SigTuple',
    duration: 'Feb 2017 — Feb 2018',
    bullets: [
      'Product lead for Drishti — AI-based retinal diagnosis system',
      'Worked across design, engineering, and data science to ship clinical AI',
      'Managed roadmap, sprints, and stakeholder communication',
    ],
  },
  {
    id: '6',
    role: 'Business Analyst',
    company: 'Flipkart',
    duration: 'Aug 2015 — Jun 2016',
    bullets: [
      'Built KNN clustering for seller segmentation',
      'Designed data pipelines for analytics and experimentation',
    ],
  },
  {
    id: '7',
    role: 'Decision Scientist',
    company: 'MuSigma',
    duration: 'Jun 2013 — Jun 2015',
    bullets: [
      'Built marketing optimization models for US pharma clients',
      'Derived insights from large, multi-source datasets',
    ],
  },
]

/** Row in a tech-stack card: Simple Icons slug, emoji, or letter badge */
export type ExpertiseSkillItem =
  | { name: string; icon: string }
  | { name: string; emoji: string }
  | { name: string; letter: string }

export type ExpertiseStackCard = {
  title: string
  items: ExpertiseSkillItem[]
  /** Dense two-column list (e.g. dev tools) */
  twoColumn?: boolean
}

export const techStackCards: ExpertiseStackCard[] = [
  {
    title: 'AI / LLM',
    items: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Claude (Anthropic)', icon: 'anthropic' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'spaCy', icon: 'spacy' },
    ],
  },
  {
    title: 'Data & ML',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'Jupyter', icon: 'jupyter' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    title: 'Engineering',
    twoColumn: true,
    items: [
      { name: 'Golang', icon: 'go' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'GraphQL', icon: 'graphql' },
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
    ],
  },
  {
    title: 'Automation & platforms',
    items: [
      { name: 'Apache Airflow', icon: 'apacheairflow' },
      { name: 'n8n', icon: 'n8n' },
      { name: 'Zapier', icon: 'zapier' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Google Cloud', icon: 'googlecloud' },
    ],
  },
  {
    title: 'LLM ops',
    items: [
      { name: 'OpenTelemetry', icon: 'opentelemetry' },
      { name: 'Weights & Biases', icon: 'weightsandbiases' },
      { name: 'Langfuse', icon: 'langfuse' },
    ],
  },
]

export const softSkillsCard: ExpertiseStackCard = {
  title: 'How I work',
  items: [
    { name: 'Technology leadership', icon: 'handshake' },
    { name: 'Cross-functional delivery', icon: 'chatbot' },
    { name: 'Roadmapping & prioritization', icon: 'linear' },
    { name: 'Team building & mentoring', icon: 'readthedocs' },
    { name: 'Operating with ambiguity', icon: 'target' },
  ],
}

export const spokenLanguagesCard: ExpertiseStackCard = {
  title: 'Spoken languages',
  items: [
    { name: 'English — professional', emoji: '🇬🇧' },
    { name: 'Hindi — fluent', emoji: '🇮🇳' },
    { name: 'Kannada — native', letter: 'ಕ' },
  ],
}

export type Certification = {
  name: string
  year: number
  issuer?: string
}

export const certifications: Certification[] = []

export const education = {
  degree: 'B.E. in Electronics and Communication',
  university: 'M S Ramaiah Institute of Technology',
  details:
    'Relevant coursework: Algorithms and Data Structures, Image Processing, Web Development.',
} as const

export type ProjectStatusBadge = {
  variant: 'teal' | 'purple'
  label: string
}

export type ProjectDescriptionSegment =
  | { kind: 'text'; value: string }
  | { kind: 'link'; value: string; href: string }

export type Project = {
  id: string
  title: string
  description: string
  /** Inline teal links in the body; omit to render `description` as plain text */
  descriptionSegments?: ProjectDescriptionSegment[]
  tags: string[]
  status: ProjectStatusBadge
  demoUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  /** CTA label for the case-study pill button */
  caseStudyCta?: string
  /** Display-only (e.g. "31.0K") when you want stats beside GitHub */
  githubStars?: string
  githubForks?: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'AI Infrastructure at Scale — Turing',
    description:
      'Technology leader for a US AI lab. Built LLM training data platforms, scaled a team of 30+ engineers, and shipped human-in-the-loop and automated pipelines for data generation, evaluation, and delivery.',
    tags: ['LLM', 'AI Adoption', 'Team Leadership', 'Pipelines'],
    status: { variant: 'purple', label: 'In production' },
  },
  {
    id: 'p2',
    title: 'NLP Adoption — Purplle',
    description:
      'Brought NLP to production for a 7M-user e-commerce platform. End-to-end: annotation, spaCy NER models, search understanding, and data ingestion pipelines from scratch.',
    tags: ['NLP', 'NER', 'spaCy', 'E-commerce AI'],
    status: { variant: 'purple', label: 'In production' },
  },
  {
    id: 'p3',
    title: 'ML Recommendations — Kiwi',
    description:
      'Deployed recommendation engine with AWS Personalize. Measurable impact: +20% engagement, +30% retention. Also built push notification system to close the re-engagement loop.',
    tags: ['AWS Personalize', 'Recommendations', 'Retention'],
    status: { variant: 'purple', label: 'In production' },
  },
  {
    id: 'p4',
    title: 'AI Adoption Bootcamp',
    description:
      'Designed and delivered a structured curriculum for 30+ engineers: full-stack + AI systems, documentation, hands-on assignments, and assessment frameworks.',
    tags: ['AI Enablement', 'Curriculum', 'Golang', 'React'],
    status: { variant: 'teal', label: 'Private · On request' },
  },
  {
    id: 'p5',
    title: 'PG_Agent',
    description:
      'Agentic LangGraph system for generating competitive-programming problem packs. Handles problem statements, solutions, test cases, sandboxed runs, and critique/retry loops autonomously.',
    descriptionSegments: [
      { kind: 'text', value: 'Agentic ' },
      { kind: 'link', value: 'LangGraph', href: 'https://langchain-ai.github.io/langgraph/' },
      {
        kind: 'text',
        value:
          ' system for competitive-programming-style packs: problem statements, solutions, test cases, sandboxed runs, and critique/retry loops.',
      },
    ],
    tags: ['LangGraph', 'Agents', 'OpenAI', 'Anthropic'],
    status: { variant: 'teal', label: 'Open source' },
  },
  {
    id: 'p6',
    title: 'Tab Capture',
    description:
      'VS Code extension that captures accepted AI completions (GitHub Copilot, etc.) into structured JSONL logs — with session controls, edit-distance metrics, and feedback hooks for evaluation programs.',
    tags: ['TypeScript', 'VS Code', 'AI Evaluation', 'Copilot'],
    status: { variant: 'teal', label: 'Open source' },
  },
  {
    id: 'p7',
    title: 'Video Processing Pipeline',
    description:
      'Python pipeline: batch-processes videos via FFmpeg → AssemblyAI transcription → Claude-generated summaries. Idempotent per video with structured error handling.',
    tags: ['Python', 'AssemblyAI', 'Claude', 'Automation'],
    status: { variant: 'teal', label: 'Open source' },
  },
  {
    id: 'p8',
    title: 'MaskOn',
    description:
      'End-to-end CV demo: Keras/TensorFlow training exported to TF.js, React + MUI client, Express API, and face-api.js for in-browser face detection and inference.',
    descriptionSegments: [
      { kind: 'text', value: 'End-to-end mask vs. no-mask CV: ' },
      { kind: 'link', value: 'Keras/TensorFlow', href: 'https://www.tensorflow.org/' },
      { kind: 'text', value: ' training and export to ' },
      { kind: 'link', value: 'TensorFlow.js', href: 'https://www.tensorflow.org/js' },
      {
        kind: 'text',
        value:
          ', React + Vite + MUI client, Express API, and face-api.js for in-browser face localization and inference.',
      },
    ],
    tags: ['TensorFlow', 'React', 'Computer Vision', 'TF.js'],
    status: { variant: 'teal', label: 'Open source' },
    githubUrl: 'https://github.com/vishwanathovi/maskOn',
  },
]

export const projectsSection = {
  eyebrow: 'Work',
  title: 'AI in production',
  subtitle:
    'Real systems shipped: LLM infrastructure, NLP platforms, recommendation engines, agentic tools, and AI evaluation tooling.',
} as const

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  dateIso: string
  category: string
  href: string
}

export const blogSection = {
  eyebrow: 'Writing',
  title: 'On AI adoption',
  subtitle: 'Drafts in progress — LLM evaluation, human-in-the-loop workflows, and shipping AI reliably.',
} as const

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to evaluate LLMs before shipping',
    excerpt: 'Frameworks for making model quality measurable — before it reaches your users.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b2',
    title: 'Human-in-the-loop: when to trust the model',
    excerpt: 'Structuring annotation and review so teams move fast without losing control.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b3',
    title: 'Where LLM products break in production',
    excerpt: 'Common failure modes — and how to catch them before users do.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b4',
    title: 'Structuring an AI delivery pipeline',
    excerpt: 'From experiment to repeatable delivery: roles, gates, and operational habits.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b5',
    title: 'From ML model to production system',
    excerpt: 'Closing the gap between a trained model and something your team can run and evolve.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
]

export const finalCta = {
  headline: "Let's talk",
  body: 'Need help adopting AI in your company? I consult on AI strategy, LLM evaluation, data pipelines, and delivery ($100–200/hr).',
  buttonLabel: 'Email Vishwanatha',
  buttonHref: 'mailto:vishwanathovi@gmail.com',
} as const

export type SocialLink = {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:vishwanathovi@gmail.com' },
  { label: 'Phone', href: 'tel:+919743911883' },
]

export const footerNote =
  'AI Technology Leader · India · Open to consulting ($100–200/hr)'

export const expertiseSection = {
  eyebrow: 'Skills',
  title: 'How I build',
  subtitle: 'ML and LLM tooling, data engineering, delivery platforms — and the leadership to ship it.',
} as const
