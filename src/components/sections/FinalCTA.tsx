import { contact, finalCta } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function FinalCTA() {
  return (
    <section
      id="connect"
      aria-labelledby="cta-heading"
      className="border-b border-stone-800/90 bg-stone-950 py-16 sm:py-20 lg:py-24 [&::selection]:bg-sky-500/35 [&::selection]:text-white"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-800 px-8 py-11 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)] sm:px-12 sm:py-14 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-violet-400/20 blur-2xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2
                id="cta-heading"
                className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
              >
                {finalCta.headline}
              </h2>
            </Reveal>
            <Reveal delayMs={80}>
              <p className="mt-4 text-base leading-relaxed text-indigo-100 sm:text-lg">
                {finalCta.body}
              </p>
            </Reveal>
            <Reveal delayMs={140}>
              <div className="mt-8 flex flex-col items-center gap-5">
                <a
                  href={finalCta.buttonHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-800"
                >
                  {finalCta.buttonLabel}
                </a>
                <p className="text-sm text-indigo-100/95">
                  <span className="text-indigo-200/90">Or call </span>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="rounded-sm font-semibold text-white underline decoration-indigo-300/80 underline-offset-2 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-800"
                  >
                    {contact.phoneDisplay}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
