import { careerSection, timeline } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function CareerTimeline() {
  return (
    <section
      id="career"
      aria-labelledby="career-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 [&::selection]:bg-teal-500/30 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid opacity-70" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={careerSection.eyebrow}
          title={careerSection.title}
          subtitle={careerSection.subtitle}
          titleId="career-heading"
        />

        <div className="relative mt-12 sm:mt-14">
          {/* Mobile: vertical guide next to cards */}
          <div
            className="pointer-events-none absolute bottom-2 left-[11px] top-2 z-0 w-px bg-gradient-to-b from-teal-500/35 via-teal-500/15 to-transparent md:hidden"
            aria-hidden
          />
          {/* Desktop: dashed spine (matches projects section rhythm) */}
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 top-6 z-0 hidden w-0 -translate-x-1/2 border-l border-dashed border-teal-500/30 md:block"
            aria-hidden
          />

          {/* Mobile: generous vertical rhythm for a single-column stack; md+: tighter when cards alternate L/R */}
          <ol className="relative z-10 space-y-12 md:space-y-4 lg:space-y-5">
            {timeline.map((item, index) => {
              const isRight = index % 2 === 1
              const companyLine = item.productContext
                ? `${item.company} · ${item.productContext}`
                : item.company

              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-10">
                  <div
                    className={`hidden md:block ${isRight ? 'order-2' : 'order-1'}`}
                    aria-hidden
                  />

                  <div
                    className={`min-w-0 pl-[3.25rem] md:pl-0 ${isRight ? 'md:order-1 md:text-right' : 'md:order-2'}`}
                  >
                    <Reveal>
                      <article
                        className={`group rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 md:p-8 ${isRight ? 'md:mr-8' : 'md:ml-8'}`}
                      >
                        <div
                          className={`mb-4 flex flex-wrap items-center gap-2 ${isRight ? 'md:flex-row-reverse' : ''}`}
                        >
                          <span className="inline-flex rounded-full border border-teal-500/35 bg-teal-950/45 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300/95">
                            {item.duration}
                          </span>
                          {item.location ? (
                            <span className="text-xs font-medium text-stone-500">{item.location}</span>
                          ) : null}
                        </div>
                        <h3 className="font-display text-lg font-bold tracking-tight text-stone-50 sm:text-xl md:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-teal-400/90">{companyLine}</p>
                        {item.summary ? (
                          <p
                            className={`mt-4 text-[0.875rem] leading-relaxed text-stone-400 sm:text-[15px] ${isRight ? 'md:text-left' : ''}`}
                          >
                            {item.summary}
                          </p>
                        ) : null}
                        {item.bullets && item.bullets.length > 0 ? (
                          <ul
                            className={`mt-4 w-full list-outside list-disc space-y-2 pl-5 text-left text-[0.875rem] leading-relaxed text-stone-400 sm:text-[15px] ${isRight ? 'md:text-left' : ''}`}
                          >
                            {item.bullets.map((b, bi) => (
                              <li key={`${item.id}-${bi}`} className="marker:text-teal-500/90">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : item.description ? (
                          <p
                            className={`mt-4 text-[0.875rem] leading-relaxed text-stone-400 sm:text-[15px] ${isRight ? 'md:text-left' : ''}`}
                          >
                            {item.description}
                          </p>
                        ) : null}
                      </article>
                    </Reveal>
                  </div>

                  <div
                    className="absolute left-0 top-7 z-10 flex h-7 w-7 max-md:top-8 max-md:-translate-y-0.5 items-center justify-center rounded-full border border-white/10 bg-[#161616] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] md:left-1/2 md:top-8 md:h-6 md:w-6 md:translate-y-0 md:-translate-x-1/2"
                    aria-hidden
                  >
                    {/* Slightly smaller ring on mobile so glow stays inside the padded track */}
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-500 ring-[3px] ring-teal-950/85 md:ring-4 md:ring-teal-950/80" />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
