import type { ReactNode } from 'react'
import { projects, projectsSection } from '../../data/content'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function LinkPill({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="rounded-sm text-xs font-semibold text-sky-400 underline-offset-4 transition-colors hover:text-sky-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
    >
      {children}
    </a>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-stone-800/90 bg-stone-950 py-16 sm:py-20 lg:py-24 [&::selection]:bg-sky-500/35 [&::selection]:text-white"
    >
      <Container>
        <SectionHeading
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.title}
          subtitle={projectsSection.subtitle}
          titleId="projects-heading"
        />

        <ul className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {projects.map((project, i) => (
            <li key={project.id} className="flex h-full min-h-0">
              <Reveal delayMs={i * 80} className="h-full min-h-0 w-full">
                <article
                  className={cn(
                    'group flex h-full min-h-0 flex-col rounded-2xl bg-stone-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:p-7',
                    project.featured
                      ? 'border-2 border-amber-500/45 shadow-[0_0_32px_-8px_rgba(245,158,11,0.22),0_16px_40px_-20px_rgba(0,0,0,0.4)] hover:border-amber-400/55 hover:shadow-[0_0_40px_-6px_rgba(245,158,11,0.28),0_24px_60px_-20px_rgba(0,0,0,0.45)]'
                      : 'border border-stone-700/80 shadow-sm hover:border-stone-600 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]',
                  )}
                >
                  {project.featured ? (
                    <p className="mb-3">
                      <span className="inline-flex rounded-full border border-amber-500/40 bg-amber-950/60 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200/95">
                        Featured
                      </span>
                    </p>
                  ) : null}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-stone-600/80 bg-stone-950/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-stone-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-stone-50 sm:text-[1.35rem]">
                    {project.title}
                  </h3>
                  <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-stone-400 sm:text-[15px]">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-800 pt-5">
                    {project.demoUrl ? (
                      <LinkPill href={project.demoUrl}>Live demo</LinkPill>
                    ) : null}
                    {project.githubUrl ? (
                      <LinkPill href={project.githubUrl}>GitHub</LinkPill>
                    ) : null}
                    {project.caseStudyUrl ? (
                      <LinkPill href={project.caseStudyUrl}>Case study</LinkPill>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
