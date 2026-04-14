import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Dark matches site default; light for rare light-on-dark exceptions. */
  variant?: 'light' | 'dark'
  className?: string
  /** For aria-labelledby on the parent section */
  titleId?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  variant = 'dark',
  className,
  titleId,
}: SectionHeadingProps) {
  const isDark = variant === 'dark'
  return (
    <div
      className={cn(
        'mb-8 max-w-2xl lg:mb-10',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p
            className={cn(
              'mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]',
              isDark ? 'text-sky-400/95' : 'text-indigo-400',
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delayMs={eyebrow ? 60 : 0}>
        <h2
          id={titleId}
          className={cn(
            'border-l-[3px] pl-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:pl-4 lg:text-[2.75rem] lg:leading-[1.1]',
            isDark
              ? 'border-sky-400/90 text-stone-50'
              : 'border-indigo-500 text-stone-50',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delayMs={eyebrow ? 120 : 60}>
          <p className="mt-2.5 text-base leading-relaxed text-stone-400">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
