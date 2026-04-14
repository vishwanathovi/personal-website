import type { ExpertiseSkillItem } from '../../data/content'
import { skillIconPaths } from '../../data/skillIconPaths.generated'
import { cn } from '../../lib/cn'

type SkillGlyphProps = {
  item: ExpertiseSkillItem
  className?: string
}

export function SkillGlyph({ item, className }: SkillGlyphProps) {
  if ('emoji' in item) {
    return (
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none',
          className,
        )}
        aria-hidden
      >
        {item.emoji}
      </span>
    )
  }

  if ('letter' in item) {
    return (
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded border border-stone-600/80 bg-stone-800/80 text-[11px] font-semibold text-sky-300/95',
          className,
        )}
        aria-hidden
      >
        {item.letter}
      </span>
    )
  }

  const path = skillIconPaths[item.icon as keyof typeof skillIconPaths]
  if (!path) {
    return (
      <span
        className={cn('h-5 w-5 shrink-0 rounded bg-stone-700', className)}
        aria-hidden
      />
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-5 w-5 shrink-0 text-sky-300/90', className)}
      aria-hidden
    >
      <path fill="currentColor" d={path} />
    </svg>
  )
}
