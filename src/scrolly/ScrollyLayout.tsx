import { useEffect, useMemo, type CSSProperties, type ReactNode } from 'react'
import type { ScrollyConfig } from '../blog/types'
import initScrolly from './scrolly-runtime'
import scrollyCssUrl from './scrolly.css?url'
import '../fonts/geist.css'

const VIZ_MOUNT_IDS: Record<string, string> = {
  timeline: 'chart-timeline',
  bubbles: 'chart-bubbles',
  sem: 'chart-sem',
  scatter: 'chart-scatter',
  matrix: 'chart-matrix',
  bars: 'chart-bars',
  map: 'chart-map',
  market: 'chart-market',
  equation: 'chart-equation',
  dualmap: 'chart-dualmap',
  accuracy: 'chart-accuracy',
  precision: 'chart-precision',
  sentiment: 'chart-sentiment',
  upgrade: 'chart-upgrade',
  flow: 'chart-flow',
  governance: 'chart-governance',
  reactflow: 'chart-reactflow',
}

const VIZ_LEGEND_IDS: Record<string, string> = {
  timeline: 'legend-timeline',
}

function vizMountId(key: string) {
  return VIZ_MOUNT_IDS[key] ?? `chart-${key}`
}

function vizLegendId(key: string) {
  return VIZ_LEGEND_IDS[key]
}

function safeJson(value: unknown) {
  return JSON.stringify(value ?? null).replaceAll('</script>', '<\\/script>')
}

type ScrollyLayoutProps = {
  config: ScrollyConfig
  configId: string
  children: ReactNode
}

export function ScrollyLayout({ config, configId, children }: ScrollyLayoutProps) {
  const page = config

  const themeStyle = useMemo(() => {
    const theme = page.theme ?? {}
    const vars: Record<string, string> = {}
    if (theme.accent) vars['--accent-blue'] = theme.accent
    if (theme.secondary) vars['--political-red'] = theme.secondary
    if (theme.paper) vars['--paper'] = theme.paper
    if (theme.paperDark) vars['--paper-dark'] = theme.paperDark
    if (theme.ink) vars['--ink'] = theme.ink
    return vars as CSSProperties
  }, [page.theme])

  useEffect(() => {
    const linkId = 'scrolly-stylesheet'
    let link = document.getElementById(linkId) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      link.href = scrollyCssUrl
      document.head.appendChild(link)
    }

    document.body.classList.add('scrollytelling-theme', `page-${configId}`)
    const stored =
      localStorage.getItem('scrolly-theme') ?? localStorage.getItem('theme') ?? 'dark'
    const isLight = stored === 'light'
    document.body.classList.toggle('light-theme', isLight)
    document.documentElement.classList.toggle('dark', !isLight)
    document.documentElement.classList.toggle('light', isLight)

    const theme = page.theme ?? {}
    const prev = document.body.style.cssText

    const applyThemeVars = () => {
      const isLight = document.body.classList.contains('light-theme')
      if (theme.accent) document.body.style.setProperty('--accent-blue', theme.accent)
      if (theme.secondary) document.body.style.setProperty('--political-red', theme.secondary)

      if (isLight) {
        document.body.style.removeProperty('--paper')
        document.body.style.removeProperty('--paper-dark')
        document.body.style.removeProperty('--ink')
      } else {
        if (theme.paper) document.body.style.setProperty('--paper', theme.paper)
        if (theme.paperDark) document.body.style.setProperty('--paper-dark', theme.paperDark)
        if (theme.ink) document.body.style.setProperty('--ink', theme.ink)
      }
    }

    applyThemeVars()

    const onThemeClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('.theme-toggle-btn')) return
      document.body.classList.toggle('light-theme')
      const mode = document.body.classList.contains('light-theme') ? 'light' : 'dark'
      localStorage.setItem('scrolly-theme', mode)
      localStorage.setItem('theme', mode)
      document.documentElement.classList.toggle('dark', mode === 'dark')
      document.documentElement.classList.toggle('light', mode === 'light')
      applyThemeVars()
    }
    document.addEventListener('click', onThemeClick)

    return () => {
      document.body.classList.remove('scrollytelling-theme', 'light-theme', `page-${configId}`)
      document.body.style.cssText = prev
      document.removeEventListener('click', onThemeClick)
      document.getElementById(linkId)?.remove()
    }
  }, [configId, page.theme])

  useEffect(() => {
    let cancelled = false

    const loadD3 = () =>
      new Promise<void>((resolve, reject) => {
        if ((window as unknown as { d3?: unknown }).d3) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = 'https://d3js.org/d3.v7.min.js'
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load D3'))
        document.head.appendChild(script)
      })

    loadD3()
      .then(() => {
        if (!cancelled) {
          requestAnimationFrame(() => initScrolly())
        }
      })
      .catch(console.error)

    return () => {
      cancelled = true
    }
  }, [configId])

  return (
    <>
      <div id="progress-bar" />

      <nav id="main-nav">
        <div className="nav-inner">
          <div className="nav-brand-group">
            <a
              href={page.metadata.homeNavUrl || '/blog'}
              className="nav-home-icon"
              aria-label="Back to blog"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
            <span className="nav-logo">{page.metadata.brand}</span>
          </div>

          <div className="nav-controls-group">
            <div className="nav-sections">
              {page.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className="nav-dot"
                  data-label={s.navLabel}
                />
              ))}
            </div>
            <button type="button" className="nav-theme-toggle theme-toggle-btn" aria-label="Toggle theme">
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.76" y2="19.76" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.76" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.76" y2="4.22" />
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" style={themeStyle}>
        <div className="hero-bg">
          <div className="hero-pattern" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-label">{page.hero.label}</div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: page.hero.titleHtml }} />
          <p className="hero-sub" dangerouslySetInnerHTML={{ __html: page.hero.subtitleHtml }} />
          <p className="hero-authors" dangerouslySetInnerHTML={{ __html: page.hero.authorsHtml }} />
          <p className="hero-teaser" dangerouslySetInnerHTML={{ __html: page.hero.teaserHtml }} />
          <a href={page.hero.ctaHref} className="hero-cta" aria-label="Begin reading">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>

        {page.hero.stats && (
          <div className="hero-stats">
            {page.hero.stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="stat-num" data-target={stat.target}>0</span>
                {stat.unit && <span className="stat-unit">{stat.unit}</span>}
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div id="sidecar-wrapper">
        <div id="text-column">{children}</div>

        <div id="viz-column">
          <div
            id="viz-sticky"
            data-storage-key={`scrolly-${page.metadata.brand.toLowerCase().replaceAll(' ', '-')}-viz-h`}
          >
            <div id="mobile-viz-topbar">
              <div id="mobile-tab-bar">
                <a href={page.metadata.homeNavUrl || '/blog'} className="mob-tab mob-home-icon" aria-label="Back to blog">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </a>
                {page.sections.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`mob-tab${i === 0 ? ' active' : ''}`}
                    data-viz={`viz-${s.id}`}
                  >
                    {s.mobileLabel}
                  </button>
                ))}
              </div>
              <div id="mobile-controls">
                <button type="button" className="nav-theme-toggle theme-toggle-btn" aria-label="Toggle theme">
                  <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.76" y2="19.76" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.76" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.76" y2="4.22" />
                  </svg>
                  <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </button>
                <button type="button" id="viz-toggle" aria-label="Toggle visualization">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            </div>

            <div id="viz-panels-container">
              {page.sections.map((s, i) => (
                <div
                  key={s.id}
                  className={`viz-panel${i === 0 ? ' active' : ''}`}
                  id={`viz-${s.id}`}
                  data-viz-key={s.viz.key}
                >
                  <div className="viz-title">{s.viz.title}</div>
                  {s.viz.mount === 'svg' ? (
                    <svg data-viz-mount="svg" id={vizMountId(s.viz.key)} />
                  ) : (
                    <div data-viz-mount="div" id={vizMountId(s.viz.key)} />
                  )}
                  <div
                    data-viz-props-json={safeJson(s.viz.props)}
                    hidden
                    aria-hidden="true"
                  />
                  {s.viz.legend && (
                    <div className="viz-legend" data-viz-legend id={vizLegendId(s.viz.key)} />
                  )}
                  {s.viz.captionHtml && (
                    <div className="viz-caption" dangerouslySetInnerHTML={{ __html: s.viz.captionHtml }} />
                  )}
                </div>
              ))}
            </div>

            <div id="viz-resize-handle" aria-label="Drag to resize visualization">
              <div className="viz-resize-pill" />
            </div>
          </div>
        </div>
      </div>

      <footer id="main-footer" dangerouslySetInnerHTML={{ __html: page.footerHtml }} />
    </>
  )
}
