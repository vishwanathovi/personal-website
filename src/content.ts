/**
 * Vishwanatha HM — portfolio content
 * Use **text** for gradient-highlighted terms in descriptions.
 */

export const HERO = {
  name: 'Vishwanatha HM',
  /** Rotates in the typewriter */
  roles: [
    'AI Technology Leader',
    'Engineering Manager',
    'AI Adoption Consultant',
    'ML & AI Engineer',
  ] as const,
  /** Shows under the typewriter */
  tagline: 'who turns AI into shipped product.',
  bio: '10+ years across software, ML, and AI. I help companies use AI to build better products, improve engineering speed, and scale team execution.',
  highlights: [
    { label: 'Currently', value: 'Engineering Manager at Turing' },
    { label: 'Experience', value: 'ML systems · NLP · LLM pipelines · Engineering leadership' },
    { label: 'Open to', value: 'Consulting on AI adoption' },
  ],
  photo: '/vishwa-headshot.PNG',
  photoAlt: 'Vishwanatha HM — portrait',
  ctaPrimary:   { label: 'See my work',  href: '#projects' },
  ctaBlog:      { label: 'Read my blog', href: '/blog' },
  ctaSecondary: { label: "Let's talk",   href: '#contact' },
  pillLabels: ['AI Leader', 'ML & LLM', 'Consulting'] as const,
  linkedIn: 'https://www.linkedin.com/in/vishwanathhm/',
  github:   'https://github.com/vishwanathovi',
}

export const ABOUT = {
  eyebrow: 'The short version',
  paragraphs: [
    'I started in analytics and data science, then moved into product and engineering — AI healthcare at SigTuple, recommendation systems at Kiwi, NLP platforms at Purplle. At Turing I\'ve led AI delivery programs and scaled teams to 30–40+ engineers.',
    'I care about **outcomes, not tools**. The hard part of AI isn\'t the model — it\'s the workflow around it, the team running it, and making sure it actually improves what ships.',
  ],
  navLinks: [
    { icon: 'briefcase', label: 'My journey',  href: '#experience' },
    { icon: 'folder',    label: 'What I built', href: '#projects'   },
    { icon: 'pen',       label: 'Writing',      href: '/blog'       },
    { icon: 'mail',      label: "Let's talk",   href: '#contact'    },
  ],
}

export type ExperienceEntry = {
  id: string
  company: string
  role: string
  period: string
  location?: string
  isCurrent?: boolean
  /** Prose description. Use **text** for gradient highlights. \n\n = paragraph break. */
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'turing',
    company: 'Turing',
    role: 'Engineering Manager · AI Delivery',
    period: 'Dec 2022 — Present',
    location: 'Remote',
    isCurrent: true,
    description: `Led two major programs at a US AI company.

**AI coding-tool evaluation**: Ran a structured program comparing how AI coding assistants perform on real software work — **511 tasks, 4,997 interaction turns, 190 repositories, 40+ contributors, ~3,700 hours of coordinated technical work**. Built review workflows and quality systems to measure where AI improves developer productivity and where human oversight still matters.

**LLM data platforms**: Built training data pipelines, annotation tooling, and quality evaluation systems from the ground up. Scaled the team from early-stage to **30–40+ engineers** across delivery, tooling, and operations.`,
  },
  {
    id: 'purplle',
    company: 'Purplle',
    role: 'SDE 3 · Machine Learning',
    period: 'Apr 2021 — Aug 2022',
    location: 'Mumbai, India',
    description: `**First ML engineer** at a 7M-user beauty e-commerce platform. Started from zero — no annotation pipeline, no models, no search understanding.

Built the full stack: **annotation tooling**, spaCy NER models for product and query entities, search understanding pipelines, and multi-source data ingestion. Estimated **25–40% reduction in manual data-prep effort** once the platform was running. Everything shipped to production.`,
  },
  {
    id: 'kiwi',
    company: 'Kiwi',
    role: 'SDE · Machine Learning',
    period: 'Sep 2019 — Jun 2020',
    location: 'Bangalore, India',
    description: `Deployed a **recommendation engine using AWS Personalize** — measurable uplift within 90 days: **+20% engagement, +30% Day 2–7 retention**. Solved cold-start through explicit feature engineering and fallback ranking.

Built the supporting **push notification system** to close the re-engagement loop — personalised triggers fed directly from recommendation scores.`,
  },
  {
    id: 'sigtuple',
    company: 'SigTuple',
    role: 'Associate Product Manager',
    period: 'Feb 2017 — Feb 2018',
    location: 'Bangalore, India',
    description: `**Product lead for Drishti** — an AI-based retinal diagnosis system for clinical use. Coordinated product, engineering, data science, doctors, labs, and external stakeholders to move medical AI from prototype to something ophthalmologists could actually use.

Managed roadmap, sprint cycles, and stakeholder communication across a cross-functional team.`,
  },
  {
    id: 'sabbatical',
    company: 'Independent',
    role: 'Sabbatical · Builder',
    period: 'Jul 2020 — Mar 2021',
    description: `Deliberate break to go deep on full-stack engineering. Built complete production apps from scratch — **MERN stack, REST APIs, React, Node.js, PostgreSQL** — and developed end-to-end systems intuition: data in, model, API, UI, feedback loop.`,
  },
  {
    id: 'flipkart',
    company: 'Flipkart',
    role: 'Business Analyst',
    period: 'Aug 2015 — Jun 2016',
    location: 'Bangalore, India',
    description: `Built **KNN clustering for seller segmentation** — turned unstructured seller data into actionable cohorts used for targeting and business interventions at scale.

Designed analytics pipelines and experimentation workflows on one of India's highest-traffic e-commerce platforms.`,
  },
  {
    id: 'musigma',
    company: 'MuSigma',
    role: 'Decision Scientist',
    period: 'Jun 2013 — Jun 2015',
    location: 'Bangalore, India',
    description: `Built **marketing optimization models** for US pharmaceutical clients — marketing mix modeling, segmentation, and ROI attribution across large multi-source datasets.

Presented findings to senior stakeholders; developed the analytical rigour and communication habits that shape how I approach data and AI work today.`,
  },
]

export const EDUCATION = {
  degree: 'B.E. in Electronics and Communication',
  university: 'M S Ramaiah Institute of Technology, Bangalore',
  year: '2013',
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  status: { variant: 'teal' | 'purple' | 'gold'; label: string }
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-coding-eval',
    title: 'AI Coding Tool Evaluation — Turing',
    description: 'Led a large-scale program measuring how AI coding assistants perform on real software work. 511 tasks · 4,997 interaction turns · 190 repositories · 40+ contributors · ~3,700 hours coordinated. Built structured review workflows and quality systems to show where AI improves developer productivity — and where it still needs human oversight.',
    tags: ['AI Evaluation', 'Developer Productivity', 'Quality Systems', 'LLM'],
    status: { variant: 'gold', label: 'Enterprise delivery' },
    featured: true,
  },
  {
    id: 'recommendations-kiwi',
    title: 'ML Recommendations — Kiwi',
    description: '+20% engagement · +30% Day 2–7 retention. Built a recommendation engine with AWS Personalize, solved cold-start through explicit feature engineering, and added a push notification system to close the re-engagement loop.',
    tags: ['AWS Personalize', 'Recommendations', 'Retention', 'Push Notifications'],
    status: { variant: 'purple', label: 'In production' },
  },
  {
    id: 'nlp-purplle',
    title: 'NLP Platform — Purplle',
    description: 'Built NLP from zero at a 7M-user e-commerce platform. Annotation tooling, spaCy NER models, search understanding pipelines, and multi-source data ingestion — end-to-end. Estimated 25–40% reduction in manual data-prep effort.',
    tags: ['NLP', 'NER', 'spaCy', 'Search', 'Annotation'],
    status: { variant: 'purple', label: 'In production' },
  },
  {
    id: 'llm-platforms',
    title: 'LLM Data Platforms — Turing',
    description: 'Built training data pipelines, annotation tooling, and quality evaluation systems from scratch. Scaled the team from early-stage to 30–40+ engineers across delivery, tooling, and operations.',
    tags: ['LLM', 'Data Pipelines', 'Annotation', 'Team Leadership'],
    status: { variant: 'gold', label: 'In production' },
  },
  {
    id: 'audio-ai-app',
    title: 'AI Audio Transcription App',
    description: 'Full-stack AI app: records audio → AssemblyAI transcription → Claude-generated summaries. React + Express + PostgreSQL + JWT auth + Docker. Cuts manual note-taking by an estimated 60–80% for recorded conversations.',
    tags: ['React', 'AssemblyAI', 'Claude', 'PostgreSQL', 'Docker'],
    status: { variant: 'teal', label: 'Open source' },
  },
]

export type TechCategory = { name: string; items: string[] }

export const TECH_CATEGORIES: TechCategory[] = [
  { name: 'AI / LLM',    items: ['OpenAI', 'Claude', 'LangGraph', 'spaCy', 'TensorFlow'] },
  { name: 'Data & ML',   items: ['Python', 'Pandas', 'scikit-learn', 'PostgreSQL', 'Spark'] },
  { name: 'Engineering', items: ['Golang', 'Node.js', 'React', 'FastAPI', 'Docker', 'Java'] },
  { name: 'Automation',  items: ['Apache Airflow', 'n8n', 'Zapier', 'Google Cloud', 'Vercel'] },
]

export const SOFT_SKILLS = [
  'Technology leadership',
  'Cross-functional delivery',
  'Roadmapping & prioritization',
  'Team building & scaling',
  'Operating with ambiguity',
]

export const LANGUAGES = [
  { name: 'English',  level: 'Professional',  flag: '🇬🇧' },
  { name: 'Hindi',    level: 'Fluent',         flag: '🇮🇳' },
  { name: 'Kannada',  level: 'Native',         flag: '🇮🇳' },
]

export const CONTACT = {
  email:        'vishwanathovi@gmail.com',
  phoneDisplay: '+91 97439 11883',
  phoneTel:     '+919743911883',
  linkedIn:     'https://www.linkedin.com/in/vishwanathhm/',
  github:       'https://github.com/vishwanathovi',
  ctaTitle:     "Let's talk",
  ctaDesc:      'Need help adopting AI in your company? I consult on AI strategy, coding-tool evaluation, data pipelines, and engineering delivery.',
  ctaRate:      '',
}

export const FOOTER_NOTE = 'AI Technology Leader · India · Open to consulting'
