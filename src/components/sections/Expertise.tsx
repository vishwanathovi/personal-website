import {
  certifications,
  education,
  expertiseSection,
  softSkillsCard,
  spokenLanguagesCard,
  techStackCards,
} from '../../data/content'
import type { ExpertiseSkillItem, ExpertiseStackCard } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillGlyph } from '../ui/SkillGlyph'
import { cn } from '../../lib/cn'

/** Technical stack cards — dense grid, mono category labels, sky accent */
function TechStackCard({
  title,
  items,
  twoColumn,
  delayMs = 0,
}: {
  title: string
  items: ExpertiseSkillItem[]
  twoColumn?: boolean
  delayMs?: number
}) {
  return (
    <Reveal delayMs={delayMs}>
      <div className="h-full rounded-2xl border border-white/10 bg-[#161616] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-6">
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-400/95 sm:text-xs">
          {title}
        </h3>
        <ul
          className={cn(
            'mt-4 gap-x-4 gap-y-2.5 text-sm text-stone-100',
            twoColumn ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col',
          )}
        >
          {items.map((item) => (
            <li key={item.name} className="flex items-center gap-2.5">
              <SkillGlyph item={item} className="text-teal-400/90" />
              <span className="leading-snug">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

/** Soft skills & languages — softer panel, display headings, violet/indigo accent */
function PeopleSkillsPanel({ card, delayMs }: { card: ExpertiseStackCard; delayMs: number }) {
  return (
    <Reveal delayMs={delayMs}>
      <div>
        <h3 className="border-b border-white/[0.08] pb-2 font-display text-base font-semibold tracking-tight text-stone-100">
          {card.title}
        </h3>
        <ul className="mt-4 space-y-3">
          {card.items.map((item) => (
            <li key={item.name} className="flex items-start gap-3">
              <SkillGlyph item={item} className="mt-0.5 text-teal-400/85" />
              <span className="text-sm leading-snug text-stone-400">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function Expertise() {
  const [rowA, rowB] = [
    techStackCards.slice(0, 3),
    techStackCards.slice(3),
  ] as const

  const techDelays = rowA.map((_, i) => i * 50)
  const rowBDelay = rowA.length * 50

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 [&::selection]:bg-teal-500/30 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid opacity-70" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={expertiseSection.eyebrow}
          title={expertiseSection.title}
          subtitle={expertiseSection.subtitle}
          titleId="expertise-heading"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Mobile: tech first; desktop: people left, tech right */}
          <aside
            className="order-2 lg:order-1 lg:col-span-4 lg:self-start"
            aria-label="Soft skills and languages"
          >
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] ring-1 ring-violet-500/10 sm:p-7 lg:sticky lg:top-28">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/90">
                People & communication
              </p>
              <div className="mt-8 space-y-10">
                <PeopleSkillsPanel card={softSkillsCard} delayMs={rowA.length * 50 + rowB.length * 50} />
                <PeopleSkillsPanel
                  card={spokenLanguagesCard}
                  delayMs={rowA.length * 50 + rowB.length * 50 + 60}
                />
              </div>
            </div>
          </aside>

          <div className="order-1 space-y-5 lg:order-2 lg:col-span-8" aria-label="Technical stack">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rowA.map((card, i) => (
                <TechStackCard
                  key={card.title}
                  title={card.title}
                  items={card.items}
                  twoColumn={card.twoColumn}
                  delayMs={techDelays[i]!}
                />
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {rowB.map((card, i) => (
                <TechStackCard
                  key={card.title}
                  title={card.title}
                  items={card.items}
                  twoColumn={card.twoColumn}
                  delayMs={rowBDelay + i * 50}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-14 grid gap-8',
            certifications.length > 0 ? 'lg:grid-cols-2' : '',
          )}
        >
          {certifications.length > 0 ? (
            <Reveal delayMs={120}>
              <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-8">
                <h3 className="font-display text-lg font-semibold text-stone-50">Certifications</h3>
                <ul className="mt-5 space-y-4">
                  {certifications.map((c) => (
                    <li
                      key={c.name}
                      className="flex flex-col gap-0.5 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="font-medium text-stone-100">{c.name}</span>
                      <span className="shrink-0 text-sm text-stone-400">
                        {c.issuer ? `${c.issuer} · ` : ''}
                        {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          <Reveal delayMs={certifications.length > 0 ? 160 : 120}>
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] ring-1 ring-teal-500/10 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-stone-50">Education</h3>
              <p className="mt-3 font-display text-xl font-semibold text-teal-200/95">
                {'specialization' in education && education.specialization
                  ? `${education.degree}, ${education.specialization}`
                  : education.degree}
              </p>
              <p className="mt-1 text-sm font-medium text-stone-400">{education.university}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone-400">{education.details}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
