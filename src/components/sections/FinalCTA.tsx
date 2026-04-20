import { contact, finalCta } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function FinalCTA() {
  return (
    <section
      id="connect"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 [&::selection]:bg-teal-500/30 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid opacity-70" aria-hidden />

      <Container className="relative z-10">
        <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#161616] px-8 py-11 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] ring-1 ring-teal-500/10 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
          <div className="text-center">
            <Reveal>
              <h2
                id="cta-heading"
                className="font-display text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
              >
                {finalCta.headline}
              </h2>
            </Reveal>
            <Reveal delayMs={80}>
              <p className="mt-4 text-base leading-relaxed text-stone-400 sm:text-lg">{finalCta.body}</p>
            </Reveal>
            <Reveal delayMs={140}>
              <div className="mt-8 flex flex-col items-center gap-5">
                <a
                  href={finalCta.buttonHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-950/40 transition-colors hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
                >
                  {finalCta.buttonLabel}
                </a>
                <p className="text-sm text-stone-500">
                  <span className="text-stone-500">Or call </span>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="font-semibold text-teal-400 underline decoration-teal-500/40 underline-offset-2 transition-colors hover:text-teal-300 hover:decoration-teal-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616] rounded-sm"
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
