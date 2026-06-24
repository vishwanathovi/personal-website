import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticleBySlug } from '../blog/registry'
import { ScrollyLayout } from '../scrolly/ScrollyLayout'

export function BlogArticle() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)

  useEffect(() => {
    if (article) {
      document.title = `${article.config.metadata.title} — Vishwanatha HM`
    }
    return () => {
      document.title = 'Vishwanatha HM — AI Technology Leader'
    }
  }, [article])

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-background text-foreground">
        <h1 className="font-display text-2xl font-semibold">Post not found</h1>
        <Link to="/blog" className="text-primary hover:underline">
          ← Back to Writing
        </Link>
      </div>
    )
  }

  const { config, Content, meta } = article

  return (
    <ScrollyLayout config={config} configId={meta.slug}>
      <Content />
    </ScrollyLayout>
  )
}
