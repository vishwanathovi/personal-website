import { blogPosts, blogSection } from '../../data/content'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Blog() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-stone-950 py-16 sm:py-20 lg:py-24 [&::selection]:bg-sky-500/35 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid-on-white" aria-hidden />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={blogSection.eyebrow}
          title={blogSection.title}
          subtitle={blogSection.subtitle}
          titleId="writing-heading"
        />

        <ul className="mx-auto grid max-w-4xl gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <li key={post.id}>
              <Reveal delayMs={i * 70}>
                <article className="group overflow-hidden rounded-2xl border border-stone-700/80 bg-stone-900/45 backdrop-blur-sm transition-all duration-300 hover:border-stone-600 hover:bg-stone-900/70 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.4)]">
                  <a
                    href={post.href}
                    className="block p-6 text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500/40 sm:p-8 lg:p-10"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                          <span className="text-sky-400/95">{post.category}</span>
                          <span className="text-stone-600" aria-hidden>
                            ·
                          </span>
                          <time dateTime={post.dateIso}>{post.date}</time>
                        </div>
                        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-stone-50 transition-colors group-hover:text-sky-300 sm:text-2xl">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-stone-400">{post.excerpt}</p>
                      </div>
                      <div className="shrink-0 sm:pt-1">
                        <span className="inline-flex items-center text-sm font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-0.5">
                          Reach out
                          <span className="ml-1" aria-hidden>
                            →
                          </span>
                        </span>
                      </div>
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
