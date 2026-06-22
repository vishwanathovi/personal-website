import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Mail, Briefcase, FolderGit2, BadgeCheck, Zap,
  List, Phone, Code2, Sun, Moon, GraduationCap,
  Globe, ExternalLink,
} from 'lucide-react'
import { getTechIcon } from './tech-icons'
import {
  HERO, ABOUT, EXPERIENCE, PROJECTS, TECH_CATEGORIES,
  SOFT_SKILLS, LANGUAGES, EDUCATION, CONTACT, FOOTER_NOTE,
} from './content'

// ─────────────────────────────────────────────────────────────────────────────
// SVG icons
// ─────────────────────────────────────────────────────────────────────────────

function LinkedInLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BeamPill — spinning gradient border around a phrase in the hero h1
// ─────────────────────────────────────────────────────────────────────────────

const HEAL_PARTICLES = [
  { char: '+', left: '10%', delay: '0s',   dur: '2.8s', size: '24px' },
  { char: '·', left: '30%', delay: '0.6s', dur: '2.2s', size: '20px' },
  { char: '✦', left: '55%', delay: '1.2s', dur: '3s',   size: '18px' },
  { char: '0', left: '75%', delay: '0.3s', dur: '2.5s', size: '22px' },
  { char: '+', left: '90%', delay: '1.8s', dur: '2.6s', size: '20px' },
]

function BeamPill({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  return (
    <span className={`relative inline-block ${hydrated ? 'beam-pill' : ''}`}>
      <span className="relative z-10">{children}</span>
      {hydrated && HEAL_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: p.left, bottom: '50%', fontSize: p.size, color: 'hsl(var(--primary))', opacity: 0, animation: `heal-float ${p.dur} ease-out ${p.delay} infinite` }}
          aria-hidden="true"
        >
          {p.char}
        </span>
      ))}
    </span>
  )
}

const BEAM_STYLES_ID = 'beam-styles'
function useBeamStyles() {
  useEffect(() => {
    if (document.getElementById(BEAM_STYLES_ID)) return
    const style = document.createElement('style')
    style.id = BEAM_STYLES_ID
    style.textContent = `
      @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      @keyframes heal-float {
        0%   { opacity: 0; transform: translateY(0) scale(0.6); }
        12%  { opacity: 0.25; }
        40%  { opacity: 0.15; }
        100% { opacity: 0; transform: translateY(-60px) scale(0.2); }
      }
      @property --beam-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
      @keyframes beam-spin { 0% { --beam-angle: 0deg; } 100% { --beam-angle: 360deg; } }
      @keyframes hero-glow { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.12); opacity: 1; } }
      .beam-pill::before {
        content: '';
        position: absolute;
        inset: -1px -10px -1px -10px;
        border-radius: 9999px;
        padding: 2px;
        background: conic-gradient(
          from var(--beam-angle),
          transparent 0%, transparent 82%,
          hsl(var(--primary) / 0.05) 86%, hsl(var(--primary) / 0.15) 89%,
          hsl(var(--primary) / 0.35) 92%, hsl(var(--primary) / 0.6) 95%,
          hsl(var(--primary) / 0.9) 98%, hsl(var(--primary)) 100%, transparent 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude;
        animation: beam-spin 2s linear infinite;
      }
    `
    document.head.appendChild(style)
  }, [])
}

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

function useTypewriterRotation(
  roles: readonly string[],
  { typeSpeed = 80, deleteSpeed = 60, pauseAfterType = 2000, pauseAfterDelete = 300 } = {},
) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const currentRole = roles[roleIndex]

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => { setRoleIndex(i => (i + 1) % roles.length); setIsDeleting(false) }, pauseAfterDelete)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        const words = displayText.trimEnd().split(' ')
        words.pop()
        setDisplayText(words.length > 0 ? words.join(' ') + ' ' : '')
      }, deleteSpeed)
    } else {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), typeSpeed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])

  return { displayText, roleIndex }
}

// ─────────────────────────────────────────────────────────────────────────────
// GridSnakes — subtle animated dot trails on the hero background
// ─────────────────────────────────────────────────────────────────────────────

const GRID = 24
const SNAKE_COUNT = 3
const SNAKE_LENGTH = 8
const TICK_MS = 180
const DIRS: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]]

function GridSnakes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const resize = () => { canvas.width = parent.clientWidth; canvas.height = parent.clientHeight }
    resize()
    window.addEventListener('resize', resize)
    type Snake = { trail: [number, number][]; dir: [number, number] }
    const cols = () => Math.floor(canvas.width / GRID)
    const rows = () => Math.floor(canvas.height / GRID)
    const snakes: Snake[] = Array.from({ length: SNAKE_COUNT }, () => ({
      trail: [[Math.floor(Math.random() * cols()), Math.floor(Math.random() * rows())]],
      dir: DIRS[Math.floor(Math.random() * 4)],
    }))
    const tick = () => {
      const c = cols(); const r = rows()
      for (const snake of snakes) {
        if (Math.random() < 0.3) snake.dir = DIRS[Math.floor(Math.random() * 4)]
        const [hx, hy] = snake.trail[snake.trail.length - 1]
        let nx = hx + snake.dir[0]; let ny = hy + snake.dir[1]
        if (nx < 0) nx = c - 1; if (nx >= c) nx = 0
        if (ny < 0) ny = r - 1; if (ny >= r) ny = 0
        snake.trail.push([nx, ny])
        if (snake.trail.length > SNAKE_LENGTH) snake.trail.shift()
      }
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const snake of snakes) {
        for (let i = 0; i < snake.trail.length; i++) {
          const [gx, gy] = snake.trail[i]
          ctx.beginPath()
          ctx.arc(gx * GRID + GRID / 2, gy * GRID + GRID / 2, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,217,255,${((i + 1) / snake.trail.length) * 0.5})`
          ctx.fill()
        }
      }
    }
    let interval: ReturnType<typeof setInterval> | null = null
    const start = () => { if (!interval) interval = setInterval(tick, TICK_MS) }
    const stop  = () => { if (interval) { clearInterval(interval); interval = null } }
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? start() : stop() }, { threshold: 0 })
    io.observe(canvas)
    const onVis = () => document.visibilityState === 'visible' ? start() : stop()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedSection
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [detected, setDetected] = useState(false)
  const hydrated = useHydrated()

  useEffect(() => {
    if (!ref) return
    let first = true
    const observer = new IntersectionObserver(([entry]) => {
      if (first) { first = false; setDetected(true) }
      if (entry.isIntersecting) { setIsInView(true); observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref])

  return (
    <motion.div
      ref={setRef}
      initial={false}
      animate={!hydrated || !detected ? false : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HomeToc — scroll-tracking sidebar + mobile FAB
// ─────────────────────────────────────────────────────────────────────────────

const TOC_SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'tech',       label: 'Skills'     },
  { id: 'contact',    label: 'Contact'    },
] as const

function HomeToc() {
  const [hasRevealed, setHasRevealed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const check = () => {
      const trigger = document.getElementById('experience')
      if (!trigger) return
      const show = trigger.getBoundingClientRect().top <= 100
      setVisible(show)
      if (show && !hasRevealed) setHasRevealed(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [hasRevealed])

  useEffect(() => {
    if (!hasRevealed) return
    const update = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveId(TOC_SECTIONS[TOC_SECTIONS.length - 1].id); return
      }
      const threshold = window.innerHeight * 0.4
      let current = ''
      for (const s of TOC_SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= threshold) current = s.id
      }
      if (current) setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [hasRevealed])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setTocOpen(false)
    const isLast = id === TOC_SECTIONS[TOC_SECTIONS.length - 1].id
    const top = isLast
      ? document.documentElement.scrollHeight - window.innerHeight
      : el.getBoundingClientRect().top + window.scrollY - 96
    requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }))
  }, [])

  const activeIdx = TOC_SECTIONS.findIndex(s => s.id === activeId)
  const progressFrac = activeIdx >= 0 ? activeIdx / (TOC_SECTIONS.length - 1) : 0

  const tocNav = (
    <nav aria-label="Table of contents" className="relative">
      <div className="absolute left-[5.5px] top-[14px] w-px bg-border" style={{ height: 'calc(100% - 28px)' }} />
      <motion.div
        className="absolute left-[5.5px] top-[14px] w-px bg-primary origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progressFrac }}
        style={{ height: 'calc(100% - 28px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <ul className="relative space-y-1">
        {TOC_SECTIONS.map((section, i) => {
          const isActive = activeId === section.id
          const isPast = i <= activeIdx
          return (
            <li key={section.id} className="flex items-center gap-3">
              <motion.span
                className={`relative z-10 w-3 h-3 rounded-full border-2 shrink-0 transition-colors duration-300 ${
                  isActive ? 'border-primary bg-primary shadow-[0_0_8px_rgba(0,217,255,0.4)]'
                  : isPast  ? 'border-primary/50 bg-card'
                  : 'border-border bg-card'
                }`}
                animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={() => scrollTo(section.id)}
                className={`text-left text-[13px] tracking-wide py-1 transition-all duration-300 ${
                  isActive ? 'text-primary font-semibold translate-x-0.5'
                  : isPast  ? 'text-foreground/70'
                  : 'text-muted-foreground/60 hover:text-foreground/80'
                }`}
              >
                {section.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={hasRevealed ? { opacity: 0, x: -12 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden 2xl:block fixed top-24 left-[max(1rem,calc(50%-46rem))] w-48 z-30"
          >
            {tocNav}
          </motion.div>

          <motion.button
            initial={hasRevealed ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setTocOpen(o => !o)}
            className="2xl:hidden fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            aria-label="Toggle table of contents"
          >
            <List className="w-5 h-5" />
          </motion.button>

          {tocOpen && (
            <>
              <div className="2xl:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setTocOpen(false)} />
              <div className="2xl:hidden fixed bottom-20 right-6 z-50 w-56 bg-card border border-border rounded-xl shadow-xl p-4">
                {tocNav}
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ThemeToggle
// ─────────────────────────────────────────────────────────────────────────────

function ThemeToggle() {
  const hydrated = useHydrated()
  const [dark, setDark] = useState(true)
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')) }, [])
  const toggle = () => {
    const next = !dark; setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }
  if (!hydrated) return null
  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full border border-border bg-card hover:border-primary/50 flex items-center justify-center transition-colors duration-200"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// renderDescription — **bold** → gradient text, \n\n → paragraph break
// ─────────────────────────────────────────────────────────────────────────────

function renderDescription(text: string) {
  return text.split('\n\n').map((para, pi) => (
    <p key={pi} className={`text-muted-foreground leading-relaxed ${pi > 0 ? 'mt-3' : ''}`}>
      {para.split(/(\*\*[^*]+\*\*)/).map((chunk, ci) =>
        chunk.startsWith('**') && chunk.endsWith('**')
          ? <span key={ci} className="text-gradient-theme font-semibold">{chunk.slice(2, -2)}</span>
          : <span key={ci}>{chunk}</span>
      )}
    </p>
  ))
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const hydrated = useHydrated()
  useBeamStyles()
  const { displayText: roleText, roleIndex } = useTypewriterRotation(HERO.roles)

  return (
    <main className="min-h-screen bg-background bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      <a href="#experience" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg">
        Skip to content
      </a>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HomeToc />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <header id="top" className="relative overflow-hidden">
        <GridSnakes />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-[max(0px,calc(50%-40rem))] w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 hidden sm:block pointer-events-none animate-[hero-glow_8s_ease-in-out_infinite]" style={{ backgroundColor: 'hsl(var(--hero-orb-primary))' }} />
        <div className="absolute bottom-0 left-[max(0px,calc(50%-40rem))] w-[550px] h-[550px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 hidden sm:block pointer-events-none animate-[hero-glow_11s_ease-in-out_infinite_reverse]" style={{ backgroundColor: 'hsl(var(--hero-orb-accent))' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-32 md:pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Photo */}
            <motion.div
              initial={hydrated ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0"
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-theme-30 blur-xl" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-2xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-theme-50 p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={HERO.photo} alt={HERO.photoAlt} className="w-full h-full object-cover object-top" width={288} height={288} fetchPriority="high" />
                  </div>
                </div>
              </div>
              <motion.div
                initial={hydrated ? { scale: 0 } : false}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-theme flex items-center justify-center shadow-lg border-2 border-background"
              >
                <BadgeCheck className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={hydrated ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <p className="text-lg text-muted-foreground mb-2">
                Hi, I'm <span className="text-gradient-theme font-semibold">{HERO.name}</span>,
              </p>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-1 leading-tight">
                <span className="text-gradient-theme">
                  {hydrated ? roleText : HERO.roles[0]}
                </span>
                {hydrated && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 rounded-sm translate-y-[2px]" style={{ animation: 'blink 1s step-end infinite' }} />
                )}
                <br />
                <BeamPill>{HERO.tagline}</BeamPill>
              </h1>

              <p className="text-muted-foreground mt-4 mb-5 max-w-xl">{HERO.bio}</p>

              {/* Pill labels */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {HERO.pillLabels.map((label, i) => (
                  <span
                    key={label}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                      hydrated && i === roleIndex % HERO.pillLabels.length
                        ? 'border border-primary bg-primary/15 text-foreground scale-105'
                        : 'border border-primary/30 bg-background/80 text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={HERO.ctaPrimary.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-theme text-white font-medium hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 active:brightness-95 transition-all duration-200"
                >
                  <FolderGit2 className="w-4 h-4" />
                  {HERO.ctaPrimary.label}
                </a>
                <a
                  href={HERO.ctaSecondary.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
                >
                  <Mail className="w-4 h-4" />
                  {HERO.ctaSecondary.label}
                </a>
                <a
                  href={HERO.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
                  aria-label="LinkedIn"
                >
                  <LinkedInLogo className="w-4 h-4 text-[#0077b5]" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Highlights strip */}
          <motion.div
            initial={hydrated ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {HERO.highlights.map((h) => (
              <div key={h.label} className="p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm text-center">
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{h.label}</p>
                <p className="text-sm text-foreground">{h.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ─── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 75%, transparent 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-xs text-primary uppercase tracking-widest mb-8">{ABOUT.eyebrow}</p>
            <p className="font-display text-xl md:text-2xl leading-relaxed text-muted-foreground">
              {ABOUT.paragraphs[0].split(/(\*\*[^*]+\*\*)/).map((chunk, ci) =>
                chunk.startsWith('**') && chunk.endsWith('**')
                  ? <span key={ci} className="text-gradient-theme font-semibold">{chunk.slice(2, -2)}</span>
                  : <span key={ci}>{chunk}</span>
              )}
            </p>
            {ABOUT.paragraphs[1] && (
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                {ABOUT.paragraphs[1].split(/(\*\*[^*]+\*\*)/).map((chunk, ci) =>
                  chunk.startsWith('**') && chunk.endsWith('**')
                    ? <span key={ci} className="text-gradient-theme font-semibold">{chunk.slice(2, -2)}</span>
                    : <span key={ci}>{chunk}</span>
                )}
              </p>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
            {ABOUT.navLinks.map(link => {
              const Icon = link.icon === 'briefcase' ? Briefcase : link.icon === 'folder' ? FolderGit2 : Mail
              const isHighlight = link.icon === 'mail'
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={isHighlight
                    ? 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-theme text-white text-sm font-medium shadow-lg shadow-primary/25 hover:brightness-110 transition-all duration-200'
                    : 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-foreground transition-colors duration-200'
                  }
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              )
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 2000px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              Experience
            </h2>
          </AnimatedSection>

          <div className="space-y-10">
            {EXPERIENCE.map((entry, idx) => (
              <AnimatedSection key={entry.id} delay={0.05 * idx}>
                {entry.isCurrent ? (
                  /* ── Featured card (current role) ── */
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 hover:border-primary/40 transition-colors duration-200 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative">
                      <div className="flex flex-wrap items-start gap-3 mb-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary mt-1">Current</span>
                        <div>
                          <h3 className="font-display text-2xl font-bold leading-tight">{entry.company}</h3>
                          <p className="text-primary font-medium">{entry.role}</p>
                          <p className="text-sm text-muted-foreground">{entry.period}{entry.location ? ` · ${entry.location}` : ''}</p>
                        </div>
                      </div>
                      <div className="mt-2">{renderDescription(entry.description)}</div>
                    </div>
                  </div>
                ) : (
                  /* ── Standard timeline card ── */
                  <div className="pl-5 border-l-2 border-border hover:border-primary/50 transition-colors duration-300 py-1 group">
                    <div className="mb-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors duration-200">{entry.company}</h3>
                        <span className="text-sm text-muted-foreground">{entry.period}{entry.location ? ` · ${entry.location}` : ''}</span>
                      </div>
                      <p className="text-primary font-medium text-sm mt-0.5">{entry.role}</p>
                    </div>
                    <div>{renderDescription(entry.description)}</div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>

          {/* Education — tucked at the bottom of experience */}
          <AnimatedSection delay={0.3} className="mt-14">
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-0.5">{EDUCATION.year} · {EDUCATION.university}</p>
                <p className="font-display font-semibold">{EDUCATION.degree}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 1500px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5 text-primary" />
                </div>
                AI in production
              </h2>
              <a href={HERO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                vishwanathovi
              </a>
            </div>
          </AnimatedSection>

          {/* Featured project */}
          {PROJECTS.filter(p => p.featured).map(project => (
            <AnimatedSection key={project.id} delay={0.03} className="mb-10">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gold/15 via-gold/5 to-transparent border border-gold/30 hover:border-gold/50 transition-colors duration-200 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                      <h3 className="font-display text-xl font-bold">{project.title}</h3>
                      <span className="text-[11px] uppercase tracking-wider font-medium px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold">{project.status.label}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-md text-xs bg-muted text-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.filter(p => !p.featured).map((project, i) => {
              const isAccent = project.status.variant === 'purple'
              return (
                <AnimatedSection key={project.id} delay={0.05 + i * 0.05} className="h-full">
                  <div className={`h-full p-5 rounded-2xl bg-card border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex flex-col ${
                    isAccent ? 'border-accent/20 hover:border-accent/40' : 'border-border hover:border-primary/30'
                  }`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-semibold leading-tight">{project.title}</h3>
                      <span className={`shrink-0 text-[11px] uppercase tracking-wide font-medium px-2.5 py-1 rounded-full ${
                        isAccent ? 'bg-accent/10 border border-accent/20 text-accent' : 'bg-primary/10 border border-primary/20 text-primary'
                      }`}>
                        {project.status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:underline">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── TECH / SKILLS ────────────────────────────────────────────────── */}
      <section id="tech" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-12 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              How I build
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1}>
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Languages
              </h3>
              <div className="space-y-2 mb-8">
                {LANGUAGES.map(lang => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-sm">{lang.flag} {lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.level}</span>
                  </div>
                ))}
              </div>
              <h3 className="font-display font-semibold mb-3">How I work</h3>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="md:col-span-3">
              <h3 className="font-display font-semibold mb-4">Tech stack</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECH_CATEGORIES.map(cat => (
                  <div key={cat.name} className="p-4 rounded-xl bg-card border border-border">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">{cat.name}</span>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cat.items.map(item => {
                        const icon = getTechIcon(item)
                        return (
                          <span key={item} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs bg-muted text-foreground">
                            {icon && (
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill={icon.color} aria-hidden="true">
                                <path d={icon.path} />
                              </svg>
                            )}
                            {item}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <footer id="contact" className="relative py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 75%, transparent 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{CONTACT.ctaTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">{CONTACT.ctaDesc}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-theme text-white font-medium hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 active:brightness-95 transition-all duration-200">
                <Mail className="w-4 h-4" />
                Email me
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5">
                <Phone className="w-4 h-4" />
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5">
                <LinkedInLogo className="w-4 h-4 text-[#0077b5]" />
                LinkedIn
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>
          <p className="mt-12 text-xs text-muted-foreground">{FOOTER_NOTE}</p>
        </div>
      </footer>
    </main>
  )
}
