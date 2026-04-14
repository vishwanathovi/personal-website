import { careerSection, timeline } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function CareerTimeline() {
  return (
    <section
      id="career"
      aria-labelledby="career-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-stone-950 py-16 sm:py-20 lg:py-24 [&::selection]:bg-sky-500/35 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid-on-white" aria-hidden />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={careerSection.eyebrow}
          title={careerSection.title}
          subtitle={careerSection.subtitle}
          titleId="career-heading"
        />

        <div className="relative">
          <div
            className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-sky-500/35 via-stone-600 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ol className="relative space-y-10 md:space-y-14">
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
                    className={`pl-10 md:pl-0 ${isRight ? 'md:order-1 md:text-right' : 'md:order-2'}`}
                  >
                    <Reveal>
                      <article
                        className={`group rounded-2xl border border-stone-700/80 bg-stone-900/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-stone-600 hover:bg-stone-900/70 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] sm:p-8 ${isRight ? 'md:mr-8' : 'md:ml-8'}`}
                      >
                        <div
                          className={`mb-4 flex flex-wrap items-center gap-2 ${isRight ? 'md:flex-row-reverse' : ''}`}
                        >
                          <span className="inline-flex rounded-full border border-sky-900/60 bg-sky-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400/95">
                            {item.duration}
                          </span>
                          {item.location ? (
                            <span className="text-xs font-medium text-stone-500">{item.location}</span>
                          ) : null}
                        </div>
                        <h3 className="font-display text-xl font-semibold text-stone-50 sm:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-sky-400/90">{companyLine}</p>
                        {item.summary ? (
                          <p
                            className={`mt-4 text-sm leading-relaxed text-stone-400 sm:text-base ${isRight ? 'md:text-left' : ''}`}
                          >
                            {item.summary}
                          </p>
                        ) : null}
                        {item.bullets && item.bullets.length > 0 ? (
                          <ul className="mt-4 w-full list-outside list-disc space-y-2 pl-5 text-left text-sm leading-relaxed text-stone-400 sm:text-base">
                            {item.bullets.map((b, bi) => (
                              <li key={`${item.id}-${bi}`} className="marker:text-sky-500">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : item.description ? (
                          <p
                            className={`mt-4 text-sm leading-relaxed text-stone-400 sm:text-base ${isRight ? 'md:text-left' : ''}`}
                          >
                            {item.description}
                          </p>
                        ) : null}
                      </article>
                    </Reveal>
                  </div>

                  <div
                    className="absolute left-0 top-7 flex h-6 w-6 items-center justify-center rounded-full border-2 border-stone-800 bg-stone-950 shadow-md md:left-1/2 md:top-8 md:-translate-x-1/2"
                    aria-hidden
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500 ring-4 ring-sky-950/80" />
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
