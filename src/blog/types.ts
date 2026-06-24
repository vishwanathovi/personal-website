import type { ComponentType } from 'react'

export type BlogPostType = 'analysis' | 'research' | 'visualization' | 'essay'

export type BlogPostMeta = {
  slug: string
  title: string
  subtitle?: string
  type: BlogPostType
  date: string
  coverImage: string
  format: 'scrolly' | 'article'
}

export type ScrollyVizConfig = {
  key: string
  title: string
  captionHtml?: string
  mount: 'svg' | 'div'
  legend?: boolean
  props?: Record<string, unknown>
}

export type ScrollySectionConfig = {
  id: string
  navLabel: string
  mobileLabel: string
  viz: ScrollyVizConfig
}

export type ScrollyConfig = {
  metadata: {
    title: string
    description: string
    brand: string
    homeNavUrl?: string
  }
  hero: {
    label: string
    titleHtml: string
    subtitleHtml: string
    authorsHtml: string
    teaserHtml: string
    ctaHref: string
    stats?: Array<{ target: number; unit?: string; label: string }>
  }
  sections: ScrollySectionConfig[]
  footerHtml: string
  theme?: Partial<{
    accent: string
    secondary: string
    paper: string
    paperDark: string
    ink: string
  }>
}

export type ScrollyArticleModule = {
  meta: BlogPostMeta
  config: ScrollyConfig
  Content: ComponentType
}
