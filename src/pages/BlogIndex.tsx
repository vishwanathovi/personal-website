import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Sun, Moon } from 'lucide-react'
import { blogPosts, BLOG_TYPES } from '../blog/registry'
import type { BlogPostMeta, BlogPostType } from '../blog/types'
import '../fonts/geist.css'

type SortKey = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function sortPosts(posts: BlogPostMeta[], sort: SortKey) {
  return [...posts].sort((a, b) => {
    if (sort === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sort === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sort === 'title-asc') return a.title.localeCompare(b.title)
    return b.title.localeCompare(a.title)
  })
}

function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/50 flex items-center justify-center transition-colors duration-200"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  )
}

const selectClass =
  'w-full px-4 py-3 pr-10 rounded-lg border border-border bg-card text-foreground font-sans text-base cursor-pointer appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat focus:outline-none focus:border-primary transition-colors'

const chevronBg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"

export function BlogIndex() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<BlogPostType | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('date-desc')

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()
    const list = blogPosts.filter((post) => {
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        (post.subtitle || '').toLowerCase().includes(term)
      const matchesType = typeFilter === 'all' || post.type === typeFilter
      return matchesSearch && matchesType
    })
    return sortPosts(list, sort)
  }, [search, typeFilter, sort])

  return (
    <main className="blog-writing min-h-screen bg-background text-foreground bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <header className="mb-12">
          <h1 className="blog-headline text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Writing &amp; Research
          </h1>
          <p className="blog-text text-base md:text-lg leading-relaxed max-w-2xl">
            Interactive essays and analysis on AI adoption, engineering leadership, and shipping ML in production.
          </p>

          <div className="flex flex-wrap gap-4 items-center mt-8">
            <div className="relative flex-1 min-w-[250px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search all posts..."
                aria-label="Search posts"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground font-sans text-base focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/15 transition-all"
              />
            </div>

            <div className="min-w-[150px] flex-1 sm:flex-none">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as BlogPostType | 'all')}
                aria-label="Filter by type"
                className={selectClass}
                style={{ backgroundImage: chevronBg }}
              >
                <option value="all">All Types</option>
                {BLOG_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[140px] flex-1 sm:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort posts"
                className={selectClass}
                style={{ backgroundImage: chevronBg }}
              >
                <option value="date-desc">Date ↓</option>
                <option value="date-asc">Date ↑</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="text-center py-16 px-8 text-muted-foreground text-lg border-2 border-dashed border-border rounded-xl">
            <p>No posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted/30 mb-2">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-0 left-0 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider capitalize bg-card/90 text-primary rounded-tr-lg backdrop-blur-sm">
                    {post.type}
                  </span>
                </div>
                <div>
                  <h2 className="blog-headline font-semibold text-lg leading-snug mt-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="block text-xs text-muted-foreground mt-1" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  {post.subtitle && (
                    <p className="blog-text text-sm mt-2 leading-relaxed">{post.subtitle}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
