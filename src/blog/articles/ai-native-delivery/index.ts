import type { ScrollyArticleModule } from '../../types'
import { config } from './config'
import { AiNativeDeliverySections } from './sections'

export const aiNativeDelivery: ScrollyArticleModule = {
  meta: {
    slug: 'ai-native-delivery',
    title: 'From Delivery Operations to Delivery Intelligence',
    subtitle: 'Turning recurring annotation delivery into an AI-assisted operating system',
    type: 'essay',
    date: '2026-07-01',
    coverImage: '/blog/ai-native-delivery.svg',
    format: 'scrolly',
  },
  config,
  Content: AiNativeDeliverySections,
}
