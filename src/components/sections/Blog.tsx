import { blogPosts, blogSection } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Blog() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 [&::selection]:bg-teal-500/30 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid opacity-70" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={blogSection.eyebrow}
          title={blogSection.title}
          subtitle={blogSection.subtitle}
          titleId="writing-heading"
        />

        <ul className="relative z-10 mx-auto mt-12 max-w-4xl space-y-6 sm:mt-14 lg:space-y-8">
          {blogPosts.map((post, i) => (
            <li key={post.id}>
              <Reveal delayMs={i * 70}>
                <article className="group rounded-2xl border border-white/10 bg-[#161616] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-transform duration-300 hover:-translate-y-0.5">
                  <a
                    href={post.href}
                    className="block p-6 text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:p-7 lg:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-teal-500/35 bg-teal-950/45 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-teal-300/95">
                        {post.category}
                      </span>
                      <time
                        className="text-xs font-medium text-stone-500"
                        dateTime={post.dateIso}
                      >
                        {post.date}
                      </time>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-stone-50 transition-colors group-hover:text-teal-200 sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-stone-400 sm:text-[15px]">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
                      <span className="text-sm font-semibold text-teal-400 transition-colors group-hover:text-teal-300">
                        Reach out
                        <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </span>
                    </div>
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
