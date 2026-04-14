/**
 * Portfolio content — Vishwanatha HM
 * Edit this file to update copy, links, and section data.
 */

export const site = {
  name: 'Vishwanatha HM',
  title: 'LLM Evaluation & AI Delivery Systems Consultant',
  bio: 'With 10+ years across machine learning, data engineering, and product, I specialize in turning experimental AI workflows into structured, production-ready systems.',
  heroHighlights: [
    'Built LLM training data infrastructure for large-scale AI systems',
    'Led teams of 30+ engineers across ML and data platforms',
    'Designed NLP systems, recommendation engines, and evaluation pipelines',
    'Shipped agentic and evaluation tooling: LangGraph problem packs, Copilot completion capture in VS Code, and browser-based CV demos',
  ],
  availabilityNote: 'Currently open to consulting engagements ($100–200/hr).',
  location: 'India',
  totalExperience: '10+ years',
  /** Served from `public/My Photo - Cropped.jpg` */
  profileImage: '/My%20Photo%20-%20Cropped.jpg',
  profileImageAlt: 'Vishwanatha HM — professional portrait',
  primaryCta: { label: 'View projects', href: '#projects' },
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
  eyebrow: 'Work experience',
  title: 'From analytics and product to ML platforms and LLM data',
  subtitle:
    'End-to-end ownership across discovery → prioritization → delivery, from decision science and recommendations through NLP, annotation platforms, and generative-AI pipelines—with teams up to 30+ engineers.',
} as const

export const timeline: TimelineEntry[] = [
  {
    id: '1',
    role: 'Engineering Manager',
    company: 'Turing',
    duration: 'Dec 2022 — Present',
    bullets: [
      'Built and scaled LLM training data annotation platforms for a leading US AI company',
      'Designed automated and semi-automated pipelines for generative AI data creation',
      'Led and structured a team of 30+ engineers across delivery, tooling, and operations',
      'Focus areas: LLM data pipelines, evaluation systems, workflow automation',
    ],
  },
  {
    id: '2',
    role: 'SDE 3 — Machine Learning',
    company: 'Purple',
    duration: 'Apr 2021 — Aug 2022',
    bullets: [
      'Built a complete NLP platform covering annotation, data cleanup, model training, and inference',
      'Designed robust data ingestion pipelines for external data sources',
      'Worked on search-query understanding, NER systems, and tagging pipelines',
    ],
  },
  {
    id: '3',
    role: 'SDE — Machine Learning',
    company: 'Kiwi',
    duration: 'Sep 2019 — Jun 2020',
    bullets: [
      'Built recommendation engine using AWS Personalize',
      'Increased engagement by 20%',
      'Improved retention by 30%',
      'Designed push notification system to optimize user engagement',
    ],
  },
  {
    id: '4',
    role: 'Sabbatical — Learner',
    company: 'Independent',
    duration: 'May 2018 — Jun 2019',
    bullets: [
      'Completed full-stack bootcamp (MERN stack)',
      'Built full-scale applications using React and Node.js',
      'Self-studied software engineering and data science',
      'Focused on systems thinking and building from scratch',
    ],
  },
  {
    id: '5',
    role: 'Associate Product Manager',
    company: 'SigTuple',
    duration: 'Feb 2017 — Feb 2018',
    bullets: [
      'Worked on AI-based retinal diagnosis product (Drishti)',
      'Collaborated across design, engineering, and data science teams',
      'Managed product roadmap, sprints, and stakeholder communication',
    ],
  },
  {
    id: '6',
    role: 'Business Analyst',
    company: 'Flipkart',
    duration: 'Aug 2015 — Jun 2016',
    bullets: [
      'Built KNN-based clustering for seller segmentation',
      'Designed data pipelines for business analytics and experimentation',
    ],
  },
  {
    id: '7',
    role: 'Decision Scientist',
    company: 'MuSigma',
    duration: 'Jun 2013 — Jun 2015',
    bullets: [
      'Built marketing optimization models for US pharma clients',
      'Generated insights from large multi-source datasets',
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
  title: 'Soft skills',
  items: [
    { name: 'Cross-functional leadership', icon: 'handshake' },
    { name: 'Stakeholder communication', icon: 'chatbot' },
    { name: 'Roadmapping & prioritization', icon: 'linear' },
    { name: 'Mentoring & documentation', icon: 'readthedocs' },
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

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  /** Prominent card styling (gold border / glow) */
  featured?: boolean
  demoUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'LLM Training Data Platform',
    description:
      'Designed and scaled annotation systems for large-scale LLM training. Built pipelines for automated and semi-automated data generation. Created workflows for reviewers, QC, and delivery pipelines.',
    tags: ['LLM', 'Annotation', 'Data pipelines', 'Delivery'],
    featured: true,
  },
  {
    id: 'p2',
    title: 'NLP Platform (Purplle)',
    description:
      'Built end-to-end NLP system: annotation pipelines, spaCy-based NER models, data ingestion and preprocessing, integrating multiple sources into structured pipelines.',
    tags: ['NLP', 'NER', 'spaCy', 'Ingestion'],
    featured: true,
  },
  {
    id: 'p3',
    title: 'Recommendation Engine (Kiwi)',
    description:
      'Built ML-based recommendation system using AWS Personalize with measurable improvements in engagement and retention.',
    tags: ['AWS Personalize', 'Recommendations', 'ML'],
  },
  {
    id: 'p4',
    title: 'Golang + React Bootcamp Platform',
    description:
      'Designed and delivered structured curriculum for 30+ engineers: documentation, assignments, and assessment systems covering full-stack development and backend systems.',
    tags: ['Teaching', 'Golang', 'React', 'Curriculum'],
  },
  {
    id: 'p5',
    title: 'Video Processing System',
    description:
      'Python pipeline that batch-processes folders of video: FFmpeg to MP3, AssemblyAI transcription, and Claude-generated summaries—with idempotent outputs per video and structured error handling.',
    tags: ['Python', 'AssemblyAI', 'Claude', 'FFmpeg'],
  },
  {
    id: 'p6',
    title: 'Marscode delivery & post-processing',
    description:
      'Workspace and documentation for a delivery pipeline: canonical repo and runbooks live under marscode-delivery (README overview + post_processing runbook) for repeatable handoffs.',
    tags: ['Delivery', 'Pipeline', 'Documentation'],
  },
  {
    id: 'p7',
    title: 'MaskOn',
    description:
      'End-to-end mask vs. no-mask CV workflow: Keras/TensorFlow training and export to TensorFlow.js, React + Vite + MUI client, Express API, and face-api.js for in-browser face localization and inference.',
    tags: ['TensorFlow', 'React', 'Computer vision', 'TF.js'],
    githubUrl: 'https://github.com/vishwanathovi/maskOn',
  },
  {
    id: 'p8',
    title: 'PG_Agent',
    description:
      'Agentic LangGraph system for competitive-programming-style packs: problem statements, solutions, test cases, sandboxed runs, and critique/retry loops—plus standalone workflows for novel problems, brute-force builds, test generation, and validation.',
    tags: ['LangGraph', 'LangChain', 'OpenAI', 'Anthropic'],
  },
  {
    id: 'p9',
    title: 'Tab Capture',
    description:
      'VS Code extension that records accepted GitHub Copilot (or similar) completions into structured JSONL logs—session controls, validation filters, edit-distance metrics, and feedback hooks for evaluation and labeling programs.',
    tags: ['TypeScript', 'VS Code', 'Copilot', 'Evaluation'],
  },
]

export const projectsSection = {
  eyebrow: 'Projects',
  title: "What I've built",
  subtitle:
    'Professional highlights plus side projects: LLM data and NLP platforms, recommendations, LangGraph agents, video→transcript pipelines, IDE evaluation tooling, and CV demos.',
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
  eyebrow: 'Sharing',
  title: 'Writing',
  subtitle:
    'Drafts in progress—LLM evaluation, human-in-the-loop workflows, and shipping AI reliably.',
} as const

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Designing LLM Evaluation Systems',
    excerpt: 'Frameworks and practices for making model quality measurable and actionable.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b2',
    title: 'Building Human-in-the-Loop AI Workflows',
    excerpt: 'Structuring annotation, review, and feedback so production teams can move fast without losing control.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b3',
    title: 'Common Failure Modes in LLM Applications',
    excerpt: 'Where LLM products break in the real world—and how to catch issues before users do.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b4',
    title: 'How to Structure AI Delivery Pipelines',
    excerpt: 'From experiment to repeatable delivery: roles, gates, and operational habits.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
  {
    id: 'b5',
    title: 'From ML Models to Production Systems',
    excerpt: 'Closing the gap between a trained model and something your team can run and evolve.',
    date: 'Planned',
    dateIso: '2026-12-31',
    category: 'Topics',
    href: '#connect',
  },
]

export const finalCta = {
  headline: "Let's talk",
  body: 'Building AI systems and need evaluation, data, or delivery help? I consult on LLM quality, annotation and data pipelines, and delivery structure ($100–200/hr).',
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
  'LLM evaluation & AI delivery consultant · India · Open to consulting engagements ($100–200/hr)'

export const expertiseSection = {
  eyebrow: 'Skills',
  title: 'Tech stack',
  subtitle:
    'ML and LLM tooling, data and engineering, delivery platforms—and how I work with teams.',
} as const
