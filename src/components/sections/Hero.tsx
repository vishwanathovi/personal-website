import { site } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { HeroTrustedBy } from './HeroTrustedBy'

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-stone-950 pb-12 pt-8 sm:pb-16 sm:pt-11 lg:pb-20 lg:pt-14 [&::selection]:bg-sky-500/35 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-0 z-[1] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-indigo-600/25 via-violet-600/15 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 z-[1] h-72 w-72 rounded-full bg-gradient-to-tr from-amber-500/15 to-transparent blur-3xl"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-5 lg:gap-7">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <Reveal showImmediately>
                <h1
                  id="hero-heading"
                  className="font-display text-3xl font-semibold tracking-tight text-stone-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05] xl:text-[3.5rem]"
                >
                  {site.name}
                </h1>
              </Reveal>
              <Reveal delayMs={80} showImmediately>
                <p className="mt-2 text-lg font-medium text-sky-400/95 sm:text-2xl">{site.title}</p>
              </Reveal>
              <Reveal delayMs={120} showImmediately>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-400 sm:text-lg sm:text-xl">
                  {site.bio}
                </p>
              </Reveal>
              {site.heroHighlights.length > 0 ? (
                <Reveal delayMs={150} showImmediately>
                  <ul className="mt-4 max-w-xl list-outside list-disc space-y-0.5 pl-5 text-sm leading-snug text-stone-400 sm:text-base sm:text-lg">
                    {site.heroHighlights.map((item) => (
                      <li key={item} className="marker:text-sky-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              {site.availabilityNote ? (
                <Reveal delayMs={165} showImmediately>
                  <p className="mt-4 max-w-xl text-sm font-semibold text-sky-300 sm:text-base sm:text-lg">
                    {site.availabilityNote}
                  </p>
                </Reveal>
              ) : null}
            </div>

            <div className="order-1 flex justify-center self-center lg:order-2 lg:justify-end">
              <Reveal className="w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-none" showImmediately>
                <div className="relative mx-auto aspect-square w-full lg:mx-0 lg:max-w-[min(100%,400px)] xl:max-w-[440px]">
                  <div
                    className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-violet-600/15 opacity-90 blur-sm sm:-inset-4 sm:rounded-[2rem]"
                    aria-hidden
                  />
                  <div className="relative overflow-hidden rounded-3xl border border-stone-700/80 bg-stone-900 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                    <img
                      src={site.profileImage}
                      alt={site.profileImageAlt}
                      width={440}
                      height={440}
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-950/50 to-transparent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <Reveal delayMs={175} showImmediately>
              <HeroTrustedBy label={site.heroTrustedByLabel} />
            </Reveal>
            <Reveal delayMs={200} showImmediately>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={site.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-950/40 transition-all hover:bg-sky-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                >
                  {site.primaryCta.label}
                </a>
                <a
                  href={site.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-stone-600 bg-stone-900/60 px-7 py-3.5 text-sm font-semibold text-stone-100 shadow-sm backdrop-blur-sm transition-all hover:border-stone-500 hover:bg-stone-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                >
                  {site.secondaryCta.label}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
