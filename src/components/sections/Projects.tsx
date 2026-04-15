import type { Project } from '../../data/content'
import { projects, projectsSection } from '../../data/content'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
    </svg>
  )
}

function IconFork({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.378a.75.75 0 1 0-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  )
}

function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide',
        status.variant === 'teal'
          ? 'border-teal-500/35 bg-teal-950/45 text-teal-300/95'
          : 'border-violet-500/35 bg-violet-950/50 text-violet-300/95',
      )}
    >
      {status.label}
    </span>
  )
}

function ProjectDescription({ project }: { project: Project }) {
  const className = 'text-[0.875rem] leading-relaxed text-stone-400 sm:text-[15px]'

  if (project.descriptionSegments?.length) {
    return (
      <p className={className}>
        {project.descriptionSegments.map((seg, i) =>
          seg.kind === 'link' ? (
            <a
              key={i}
              href={seg.href}
              className="font-medium text-teal-400 underline-offset-2 transition-colors hover:text-teal-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
              rel="noopener noreferrer"
            >
              {seg.value}
            </a>
          ) : (
            <span key={i}>{seg.value}</span>
          ),
        )}
      </p>
    )
  }

  return <p className={className}>{project.description}</p>
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-b border-stone-800/90 bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 [&::selection]:bg-teal-500/30 [&::selection]:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-dot-grid opacity-70" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.title}
          subtitle={projectsSection.subtitle}
          titleId="projects-heading"
        />

        <div className="relative mt-12 sm:mt-14">
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 top-6 z-0 hidden w-0 -translate-x-1/2 border-l border-dashed border-teal-500/30 sm:block"
            aria-hidden
          />

          <ul className="relative z-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
            {projects.map((project, i) => (
              <li key={project.id} className="flex h-full min-h-0">
                <Reveal delayMs={i * 70} className="h-full min-h-0 w-full">
                  <article className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-bold tracking-tight text-stone-50 sm:text-xl">
                        {project.title}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>

                    <div className="mb-5 min-h-0 flex-1">
                      <ProjectDescription project={project} />
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-stone-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.caseStudyUrl ? (
                      <a
                        href={project.caseStudyUrl}
                        className="mb-5 inline-flex w-full items-center justify-center rounded-full bg-[#3d2d55] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4a3766] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
                      >
                        {project.caseStudyCta ?? 'Case study'}
                        <span className="ml-1" aria-hidden>
                          →
                        </span>
                      </a>
                    ) : null}

                    {project.githubUrl || project.githubStars || project.demoUrl ? (
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/[0.06] pt-4 text-xs sm:text-sm">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              className="inline-flex items-center gap-1.5 font-semibold text-teal-400 transition-colors hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
                              rel="noopener noreferrer"
                            >
                              <IconGithub className="h-4 w-4" />
                              View code
                            </a>
                          ) : null}
                          {project.demoUrl ? (
                            <a
                              href={project.demoUrl}
                              className="font-semibold text-teal-400 transition-colors hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
                            >
                              Live demo
                            </a>
                          ) : null}
                        </div>
                        {project.githubStars || project.githubForks ? (
                          <div className="flex items-center gap-3 text-stone-500">
                            {project.githubStars ? (
                              <span className="inline-flex items-center gap-1 text-amber-400/90">
                                <IconStar className="h-3.5 w-3.5" />
                                {project.githubStars}
                              </span>
                            ) : null}
                            {project.githubForks ? (
                              <span className="inline-flex items-center gap-1">
                                <IconFork className="h-3.5 w-3.5" />
                                {project.githubForks}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
