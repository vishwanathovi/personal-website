import type { ScrollyConfig } from '../../types'

const governancePoints = [
  { label: 'Schema validation', x: 0.12, y: 0.18, zone: 'automate' },
  { label: 'Req extraction', x: 0.28, y: 0.32, zone: 'review' },
  { label: 'Guideline drafting', x: 0.42, y: 0.28, zone: 'review' },
  { label: 'Trainer Q&A', x: 0.38, y: 0.52, zone: 'support' },
  { label: 'Reviewer scoring', x: 0.55, y: 0.48, zone: 'support' },
  { label: 'Scope negotiation', x: 0.78, y: 0.72, zone: 'human' },
  { label: 'Rubric revision', x: 0.68, y: 0.58, zone: 'human' },
  { label: 'Final delivery', x: 0.88, y: 0.88, zone: 'human' },
]

export const config: ScrollyConfig = {
  metadata: {
    title: 'From Delivery Operations to Delivery Intelligence',
    description:
      'How Turing could turn recurring data-annotation delivery work into a reusable, AI-assisted operating system.',
    brand: 'Delivery Intelligence',
    homeNavUrl: '/blog',
  },
  hero: {
    label: 'Interactive Essay · AI Operations',
    titleHtml: 'From Delivery Operations to <span class="hero-accent">Delivery Intelligence</span>',
    subtitleHtml: 'How Turing could turn recurring data-annotation work into an AI-assisted operating system',
    authorsHtml: 'Vishwanatha HM · AI Delivery and Engineering',
    teaserHtml:
      'Data annotation is often described as a workforce problem. But behind every delivered dataset is a much larger system — requirements, guidelines, qualification, validation, review, and change management. <em>The real product is the delivery system that produces the data.</em>',
    ctaHref: '#section-delivery-machine',
  },
  sections: [
    {
      id: 'delivery-machine',
      navLabel: 'Delivery',
      mobileLabel: 'Lifecycle',
      viz: {
        key: 'reactflow',
        title: 'Current Delivery Lifecycle',
        captionHtml:
          'Client materials enter discovery and clarification, then build into design, setup, production, and delivery — with iteration back to clarification.',
        mount: 'div',
        props: { variant: 'delivery-lifecycle' },
      },
    },
    {
      id: 'invisible-knowledge',
      navLabel: 'Knowledge',
      mobileLabel: 'Fragments',
      viz: {
        key: 'reactflow',
        title: 'Fragmented Project Information',
        captionHtml:
          'Operational knowledge scattered across clusters — dashed links show incomplete connections to the knowledge layer.',
        mount: 'div',
        props: { variant: 'knowledge-clusters' },
      },
    },
    {
      id: 'capture-before-automation',
      navLabel: 'Capture',
      mobileLabel: 'Pipeline',
      viz: {
        key: 'reactflow',
        title: 'Information Collection Pipeline',
        captionHtml:
          'Sources land in central storage first, then pass through normalization stages into governed compartments of the project knowledge store.',
        mount: 'div',
        props: { variant: 'capture-pipeline' },
      },
    },
    {
      id: 'ground-truth',
      navLabel: 'Truth',
      mobileLabel: 'Layers',
      viz: {
        key: 'reactflow',
        title: 'Authority & Version Hierarchy',
        captionHtml:
          'Knowledge gains authority layer by layer — select a requirement to trace its version history; superseded states remain visible but never govern.',
        mount: 'div',
        props: { variant: 'knowledge-layers' },
      },
    },
    {
      id: 'skills-not-prompts',
      navLabel: 'Skills',
      mobileLabel: 'Skills',
      viz: {
        key: 'reactflow',
        title: 'From Prompts to Skills',
        captionHtml:
          'Ad hoc prompts become governed skills — with shared inputs, schemas, evaluation, and human approval.',
        mount: 'div',
        props: { variant: 'skills-transformation' },
      },
    },
    {
      id: 'project-launch',
      navLabel: 'Launch',
      mobileLabel: 'Launch',
      viz: {
        key: 'reactflow',
        title: 'AI-Assisted Project Launch',
        captionHtml:
          'Client inputs progressively build a production-ready package — human approval gates at each stage.',
        mount: 'div',
        props: { variant: 'project-launch' },
      },
    },
    {
      id: 'production-copilots',
      navLabel: 'Copilots',
      mobileLabel: 'Copilots',
      viz: {
        key: 'reactflow',
        title: 'Role-Based Production Copilots',
        captionHtml:
          'Four production lanes — each reads governed knowledge, receives AI recommendations (✦), and returns data only after human decisions (✓).',
        mount: 'div',
        props: { variant: 'production-copilots' },
      },
    },
    {
      id: 'human-governance',
      navLabel: 'Governance',
      mobileLabel: 'Governance',
      viz: {
        key: 'governance',
        title: 'Human–AI Responsibility Matrix',
        captionHtml: 'Tasks mapped by structure and consequence — automation authority increases only in the lower-left quadrant.',
        mount: 'svg',
        props: { points: governancePoints },
      },
    },
    {
      id: 'cross-project-intelligence',
      navLabel: 'Learning',
      mobileLabel: 'Flywheel',
      viz: {
        key: 'reactflow',
        title: 'Cross-Project Learning Flywheel',
        captionHtml:
          'Each completed project contributes approved, anonymised lessons — strengthening skill modules and the next launch.',
        mount: 'div',
        props: { variant: 'learning-flywheel' },
      },
    },
    {
      id: 'maturity-path',
      navLabel: 'Adoption',
      mobileLabel: 'Maturity',
      viz: {
        key: 'reactflow',
        title: 'AI Adoption Maturity Path',
        captionHtml:
          'Six cumulative levels — click a stage to explore it; foundation shelves and the ascent path show why advanced automation requires earlier capture and governance.',
        mount: 'div',
        props: { variant: 'maturity-path' },
      },
    },
    {
      id: 'future-state',
      navLabel: 'Future',
      mobileLabel: 'Future',
      viz: {
        key: 'reactflow',
        title: 'Complete Delivery Intelligence Architecture',
        captionHtml:
          'Click through four layers — primary flow, roles, systems, then a calm learning loop — to reveal the full operating system.',
        mount: 'div',
        props: { variant: 'future-state' },
      },
    },
  ],
  footerHtml: `
    <div class="footer-inner">
      <p class="footer-text">Capture reliably. Govern what ships. Let each project teach the next.</p>
      <div class="footer-actions">
        <a href="/blog" class="footer-btn primary">← Back to Writing</a>
        <a href="/#contact" class="footer-btn secondary">Get in touch</a>
      </div>
      <p class="footer-credit">Vishwanatha HM · Turing · 2026</p>
    </div>
  `,
  theme: {
    accent: '#5EEAD4',
    secondary: '#60A5FA',
    paper: '#07111F',
    paperDark: '#0D1B2A',
    ink: '#F4F7FB',
  },
}
