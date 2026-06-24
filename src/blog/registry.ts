import type { BlogPostMeta, ScrollyArticleModule } from './types'
import { aiAdoptionGap } from './articles/ai-adoption-gap'
import { aiNativeDelivery } from './articles/ai-native-delivery'

const articles: ScrollyArticleModule[] = [aiNativeDelivery, aiAdoptionGap]

export const blogPosts: BlogPostMeta[] = articles
  .map((a) => a.meta)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getArticleBySlug(slug: string): ScrollyArticleModule | undefined {
  return articles.find((a) => a.meta.slug === slug)
}

export const BLOG_TYPES = [...new Set(blogPosts.map((p) => p.type))].sort()
