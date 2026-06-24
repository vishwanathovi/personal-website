import type { ScrollyArticleModule } from '../../types'
import { config } from './config'
import { AiAdoptionGapContent } from './content'

export const aiAdoptionGap: ScrollyArticleModule = {
  meta: {
    slug: 'ai-adoption-gap',
    title: 'The AI Adoption Gap',
    subtitle: 'Why most AI pilots never make it to production',
    type: 'analysis',
    date: '2026-03-15',
    coverImage: '/blog/ai-adoption-gap.svg',
    format: 'scrolly',
  },
  config,
  Content: AiAdoptionGapContent,
}
