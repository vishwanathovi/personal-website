import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Mail, Briefcase, FolderGit2, BadgeCheck,
  Zap, ChevronRight, List, Phone, Code2, Sun, Moon,
  GraduationCap,
} from 'lucide-react'
import {
  site, contact, timeline, projects, techStackCards, softSkillsCard,
  spokenLanguagesCard, education, projectsSection, expertiseSection,
  finalCta, footerNote, careerSection,
} from './data/content'

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

function useTypewriterRotation(
  roles: readonly string[],
  { typeSpeed = 75, deleteSpeed = 50, pauseAfterType = 2200, pauseAfterDelete = 300 } = {},
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
      timeout = setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length)
        setIsDeleting(false)
      }, pauseAfterDelete)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        const words = displayText.trimEnd().split(' ')
        words.pop()
        setDisplayText(words.length > 0 ? words.join(' ') + ' ' : '')
      }, deleteSpeed)
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
        typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])

  return { displayText, roleIndex }
}

// ---------------------------------------------------------------------------
// AnimatedSection — fades + slides up on scroll
// ---------------------------------------------------------------------------

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [el, setEl] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const [detected, setDetected] = useState(false)
  const hydrated = useHydrated()

  useEffect(() => {
    if (!el) return
    let first = true
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (first) { first = false; setDetected(true) }
        if (entry.isIntersecting) { setInView(true); obs.disconnect() }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [el])

  return (
    <motion.div
      ref={setEl}
      initial={false}
      animate={
        !hydrated || !detected ? false
        : inView ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// GridSnakes — subtle animated dot trails on the hero background
// ---------------------------------------------------------------------------

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

    const resize = () => {
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
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
          ctx.fillStyle = `rgba(0, 217, 255, ${((i + 1) / snake.trail.length) * 0.5})`
          ctx.fill()
        }
      }
    }

    let interval: ReturnType<typeof setInterval> | null = null
    const start = () => { if (!interval) interval = setInterval(tick, TICK_MS) }
    const stop = () => { if (interval) { clearInterval(interval); interval = null } }

    const io = new IntersectionObserver(
      ([e]) => { e.isIntersecting && document.visibilityState === 'visible' ? start() : stop() },
      { threshold: 0 },
    )
    io.observe(canvas)
    const onVis = () => {
      document.visibilityState === 'visible' && canvas.getBoundingClientRect().top < window.innerHeight ? start() : stop()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop(); io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />
}

// ---------------------------------------------------------------------------
// HomeToc — scroll-tracking sidebar TOC
// ---------------------------------------------------------------------------

const TOC_SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'tech',       label: 'Skills'     },
  { id: 'contact',    label: 'Contact'    },
] as const

function HomeToc() {
  const hydrated = useHydrated()
  const [hasRevealed, setHasRevealed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [open, setOpen] = useState(false)

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
        setActiveId(TOC_SECTIONS[TOC_SECTIONS.length - 1].id)
        return
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
    setOpen(false)
    const isLast = id === TOC_SECTIONS[TOC_SECTIONS.length - 1].id
    const top = isLast
      ? document.documentElement.scrollHeight - window.innerHeight
      : el.getBoundingClientRect().top + window.scrollY - 96
    requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }))
  }, [])

  const activeIdx = TOC_SECTIONS.findIndex(s => s.id === activeId)
  const progressFrac = activeIdx >= 0 ? activeIdx / (TOC_SECTIONS.length - 1) : 0

  if (!hydrated) return null

  const nav = (
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
                  isActive
                    ? 'border-primary bg-primary shadow-[0_0_8px_rgba(0,217,255,0.4)]'
                    : isPast ? 'border-primary/50 bg-card'
                    : 'border-border bg-card'
                }`}
                animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={() => scrollTo(section.id)}
                className={`text-left text-[13px] tracking-wide py-1 transition-all duration-300 ${
                  isActive ? 'text-primary font-semibold translate-x-0.5'
                  : isPast ? 'text-foreground/70'
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
          {/* Desktop sidebar */}
          <motion.div
            initial={hasRevealed ? { opacity: 0, x: -12 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden 2xl:block fixed top-24 left-[max(1rem,calc(50%-46rem))] w-48 z-30"
          >
            {nav}
          </motion.div>

          {/* Mobile FAB */}
          <motion.button
            initial={hasRevealed ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(o => !o)}
            className="2xl:hidden fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            aria-label="Toggle table of contents"
          >
            <List className="w-5 h-5" />
          </motion.button>

          {open && (
            <>
              <div className="2xl:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
              <div className="2xl:hidden fixed bottom-20 right-6 z-50 w-56 bg-card border border-border rounded-xl shadow-xl p-4">
                {nav}
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// ThemeToggle
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const hydrated = useHydrated()
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

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

const TYPEWRITER_ROLES = [
  'AI Technology Leader',
  'ML & LLM Engineer',
  'AI Adoption Consultant',
  'Engineering Manager',
] as const

const ROLE_PILLS = ['AI Leader', 'ML & LLM', 'Consulting'] as const

export default function App() {
  const hydrated = useHydrated()
  const { displayText: roleText, roleIndex } = useTypewriterRotation(TYPEWRITER_ROLES)

  return (
    <main className="min-h-screen bg-background bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Theme toggle — fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HomeToc />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header id="top" className="relative overflow-hidden">
        <GridSnakes />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div
          className="absolute top-0 right-[max(0px,calc(50%-40rem))] w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 hidden sm:block pointer-events-none"
          style={{ backgroundColor: 'hsl(var(--hero-orb-primary))', animation: 'hero-glow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 left-[max(0px,calc(50%-40rem))] w-[550px] h-[550px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 hidden sm:block pointer-events-none"
          style={{ backgroundColor: 'hsl(var(--hero-orb-accent))', animation: 'hero-glow 11s ease-in-out infinite reverse' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-32 md:pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">

            {/* Avatar */}
            <motion.div
              initial={hydrated ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <div className="absolute inset-0 rounded-full bg-gradient-theme-30 blur-xl" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-2xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-theme-50 p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={site.profileImage}
                      alt={site.profileImageAlt}
                      className="w-full h-full object-cover object-top"
                      width={208}
                      height={208}
                      fetchPriority="high"
                    />
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
                Hi, I'm{' '}
                <span className="text-gradient-theme font-semibold">{site.name}</span>,
              </p>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 leading-tight">
                <span className="text-gradient-theme">
                  {hydrated ? roleText : TYPEWRITER_ROLES[0]}
                </span>
                {hydrated && (
                  <span
                    className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 rounded-sm translate-y-[2px]"
                    style={{ animation: 'blink 1s step-end infinite' }}
                  />
                )}
                <br />
                <span className="text-foreground text-2xl md:text-3xl font-medium">
                  who ships AI to production.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-lg">
                {site.bio}
              </p>

              {/* Role pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
                {ROLE_PILLS.map((label, i) => (
                  <span
                    key={label}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                      hydrated && i === roleIndex % ROLE_PILLS.length
                        ? 'border border-primary bg-primary/15 text-foreground scale-105'
                        : 'border border-primary/30 bg-background/80 text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <a
                  href="#projects"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-theme text-white text-sm font-medium shadow-lg shadow-primary/25 hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 active:brightness-95 transition-all duration-200"
                >
                  <FolderGit2 className="w-4 h-4" />
                  See my work
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </a>
              </div>

              <p className="text-sm text-primary font-medium">{site.availabilityNote}</p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* STORY / ABOUT                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section id="about" className="relative py-16 md:py-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 75%, transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-display text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              10+ years from decision science to LLM infrastructure.{' '}
              <span className="text-foreground font-semibold">
                Now I help companies adopt AI —
              </span>{' '}
              <span className="text-gradient-theme font-semibold">
                strategy to production.
              </span>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-10">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Briefcase className="w-4 h-4" />, label: 'My journey',   href: '#experience' },
                { icon: <FolderGit2 className="w-4 h-4" />, label: 'What I built', href: '#projects'   },
                { icon: <Mail className="w-4 h-4" />,        label: "Let's talk",   href: '#contact', highlight: true },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    item.highlight
                      ? 'flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-theme text-white text-sm font-medium shadow-lg shadow-primary/25 hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200'
                      : 'flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-all duration-200'
                  }
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* EXPERIENCE                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="experience" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">

          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              {careerSection.title}
            </h2>
            <p className="text-muted-foreground mb-10 pl-[3.25rem]">{careerSection.subtitle}</p>
          </AnimatedSection>

          {/* Turing — featured card */}
          <AnimatedSection delay={0.1} className="mb-14">
            <div className="p-7 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-colors duration-200">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="badge px-3 py-1 bg-primary/10 text-primary text-[11px] uppercase tracking-widest">
                      Current
                    </span>
                    <h3 className="font-display text-2xl font-bold">{timeline[0].company}</h3>
                  </div>
                  <p className="text-primary font-medium">{timeline[0].role}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{timeline[0].duration}</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {timeline[0].bullets?.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* All other roles */}
          {timeline.slice(1).map((entry, i) => (
            <AnimatedSection key={entry.id} delay={0.08 * (i + 1)} className="mb-10">
              <div className="pl-6 border-l-2 border-border hover:border-primary/40 transition-colors duration-300 group">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 mb-1">
                  <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors duration-200">
                    {entry.company}
                  </h3>
                  <span className="text-sm text-muted-foreground">{entry.duration}</span>
                </div>
                <p className="text-primary font-medium text-sm mb-3">{entry.role}</p>
                {entry.bullets && (
                  <ul className="space-y-1.5">
                    {entry.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimatedSection>
          ))}

          {/* Education */}
          <AnimatedSection delay={0.5} className="mt-4">
            <div className="pl-6 border-l-2 border-border group">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold">{education.university}</h3>
              </div>
              <p className="text-primary font-medium text-sm mb-1">{education.degree}</p>
              <p className="text-sm text-muted-foreground">{education.details}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PROJECTS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">

          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FolderGit2 className="w-5 h-5 text-primary" />
              </div>
              {projectsSection.title}
            </h2>
            <p className="text-muted-foreground mb-10 pl-[3.25rem]">{projectsSection.subtitle}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => {
              const isPurple = project.status.variant === 'purple'
              return (
                <AnimatedSection key={project.id} delay={0.05 * i}>
                  <div
                    className={`h-full p-6 rounded-2xl border transition-colors duration-200 group flex flex-col ${
                      isPurple
                        ? 'bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20 hover:border-accent/40'
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3
                        className={`font-display text-lg font-bold transition-colors duration-200 ${
                          isPurple ? 'group-hover:text-accent' : 'group-hover:text-primary'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <span
                        className={`badge shrink-0 px-2.5 py-1 text-[11px] ${
                          isPurple ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {project.status.label}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-background/80 border border-border/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.githubUrl && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          View on GitHub
                        </a>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SKILLS / TECH STACK                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="tech" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">

          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              {expertiseSection.title}
            </h2>
            <p className="text-muted-foreground mb-10 pl-[3.25rem]">{expertiseSection.subtitle}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStackCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={0.05 * i}>
                <div className="h-full p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-200">
                  <h3 className="font-display font-semibold mb-3 text-[11px] uppercase tracking-widest text-primary">
                    {card.title}
                  </h3>
                  <div className={card.twoColumn ? 'grid grid-cols-2 gap-y-1.5 gap-x-2' : 'flex flex-col gap-1.5'}>
                    {card.items.map(item => (
                      <span key={item.name} className="text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* How I work */}
            <AnimatedSection delay={0.3}>
              <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 hover:border-accent/40 transition-colors duration-200">
                <h3 className="font-display font-semibold mb-3 text-[11px] uppercase tracking-widest text-accent">
                  {softSkillsCard.title}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {softSkillsCard.items.map(item => (
                    <span key={item.name} className="text-sm text-muted-foreground">{item.name}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Spoken languages */}
            <AnimatedSection delay={0.35}>
              <div className="h-full p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-200">
                <h3 className="font-display font-semibold mb-3 text-[11px] uppercase tracking-widest text-primary">
                  {spokenLanguagesCard.title}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {spokenLanguagesCard.items.map(item => (
                    <span key={item.name} className="text-sm text-muted-foreground flex items-center gap-2">
                      {'emoji' in item && <span>{item.emoji}</span>}
                      {'letter' in item && (
                        <span className="text-primary font-bold text-base">{item.letter}</span>
                      )}
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-theme flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {finalCta.headline}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {finalCta.body}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={finalCta.buttonHref}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-theme text-white font-medium shadow-lg shadow-primary/25 hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 active:brightness-95 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                {finalCta.buttonLabel}
              </a>
              <a
                href={`tel:${contact.phoneTel}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 font-medium transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {contact.phoneDisplay}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{footerNote}</p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors duration-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <span className="text-border">·</span>
            <a href={`tel:${contact.phoneTel}`} className="hover:text-primary transition-colors duration-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Phone
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
