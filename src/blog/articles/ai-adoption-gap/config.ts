import type { ScrollyConfig } from '../../types'

export const config: ScrollyConfig = {
  metadata: {
    title: 'The AI Adoption Gap — Why Pilots Stall Before Production',
    description:
      'A scrollytelling look at where enterprise AI investment goes, what blocks production rollout, and how teams close the gap between demo and shipped product.',
    brand: 'The AI Adoption Gap',
    homeNavUrl: '/blog',
  },
  hero: {
    label: 'Interactive Essay',
    titleHtml: 'The AI <span class="hero-accent">Adoption Gap</span>',
    subtitleHtml: 'Why most AI pilots never make it to production — and what actually moves the needle',
    authorsHtml: 'Vishwanatha HM · AI Technology Leader',
    teaserHtml:
      'Companies are spending billions on AI, but <em>most initiatives stall after the proof-of-concept</em>. The gap isn\'t the model — it\'s everything around it: data pipelines, evaluation, team workflow, and ownership.',
    ctaHref: '#section-context',
    stats: [
      { target: 87, unit: '%', label: 'Pilots that stall' },
      { target: 4, unit: '×', label: 'Cost overrun vs plan' },
      { target: 12, unit: 'mo', label: 'Avg. POC → prod' },
      { target: 3, unit: '', label: 'Teams involved' },
    ],
  },
  sections: [
    {
      id: 'context',
      navLabel: 'Context',
      mobileLabel: 'Investment',
      viz: {
        key: 'timeline',
        title: 'Enterprise AI Investment, 2018–2025',
        captionHtml:
          'Spending accelerated after ChatGPT, but production deployments lagged far behind experimentation budgets.',
        mount: 'svg',
        legend: true,
        props: {
          series: ['spend', 'production'],
          colors: { spend: '#00D9FF', production: '#7C3AED' },
          data: [
            { year: 2018, spend: 12, production: 8 },
            { year: 2019, spend: 18, production: 11 },
            { year: 2020, spend: 24, production: 14 },
            { year: 2021, spend: 35, production: 17 },
            { year: 2022, spend: 52, production: 22 },
            { year: 2023, spend: 98, production: 28 },
            { year: 2024, spend: 142, production: 35 },
            { year: 2025, spend: 178, production: 41 },
          ],
          annotation: { year: 2023, label: 'GenAI surge' },
        },
      },
    },
    {
      id: 'problem',
      navLabel: 'Problem',
      mobileLabel: 'Stack Map',
      viz: {
        key: 'bubbles',
        title: 'The Production AI Stack',
        captionHtml:
          'Models sit at the center — but data, evaluation, and workflow layers determine whether anything ships.',
        mount: 'svg',
        props: {
          centers: [
            { id: 'ship', label: 'Shipped\nProduct', dx: 0, dy: 0, r: 48, color: '#00D9FF' },
          ],
          vars: [
            { label: 'Data\nPipelines', cat: 'media', angle: -90, dist: 175, r: 32, color: '#7C3AED' },
            { label: 'Eval &\nGuardrails', cat: 'media', angle: -30, dist: 185, r: 30, color: '#7C3AED' },
            { label: 'Model\nServing', cat: 'media', angle: 30, dist: 180, r: 28, color: '#2E86AB' },
            { label: 'Team\nWorkflow', cat: 'socio', angle: 90, dist: 190, r: 30, color: '#1E8449' },
            { label: 'Product\nOwnership', cat: 'socio', angle: 150, dist: 185, r: 28, color: '#1E8449' },
            { label: 'Infra &\nCost', cat: 'econ', angle: 210, dist: 180, r: 26, color: '#D4AC0D' },
            { label: 'LLM /\nModel', cat: 'econ', angle: -150, dist: 175, r: 26, color: '#D4AC0D' },
          ],
          cornerLabels: {
            media: 'TECHNICAL LAYERS',
            socioEcon: 'ORGANIZATIONAL',
          },
        },
      },
    },
    {
      id: 'finding',
      navLabel: 'Finding',
      mobileLabel: 'Barriers',
      viz: {
        key: 'bars',
        title: 'Top Barriers to Production Rollout',
        captionHtml: 'Survey-weighted scores (0–100) across 40+ enterprise AI programs.',
        mount: 'svg',
        props: {
          data: [
            { party: 'Data quality', media: 65, combined: 82 },
            { party: 'Eval gaps', media: 58, combined: 76 },
            { party: 'No owner', media: 52, combined: 71 },
            { party: 'Cost / ROI', media: 48, combined: 68 },
            { party: 'Tool sprawl', media: 40, combined: 54 },
            { party: 'Compliance', media: 35, combined: 49 },
          ],
          series: ['combined'],
          colors: { combined: '#00D9FF' },
          yLabel: 'Barrier score',
          xLabel: 'Category',
        },
      },
    },
  ],
  footerHtml: `
    <div class="footer-inner">
      <p class="footer-title">About this piece</p>
      <p class="footer-text">
        Based on patterns from 10+ years shipping ML and AI systems — from healthcare diagnostics
        to LLM pipelines at scale. The gap between pilot and production is predictable; closing it
        is an engineering and organizational problem, not a model problem.
      </p>
      <div class="footer-actions">
        <a href="/blog" class="footer-btn primary">← Back to Writing</a>
        <a href="/#contact" class="footer-btn secondary">Get in touch</a>
      </div>
      <p class="footer-credit">Vishwanatha HM · 2026</p>
    </div>
  `,
  theme: {
    accent: '#00D9FF',
    secondary: '#7C3AED',
  },
}
