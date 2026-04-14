import { Container } from '../ui/Container'
import { cn } from '../../lib/cn'

const nav = [
  { label: 'Experience', href: '#career' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#expertise' },
  { label: 'Writing', href: '#writing' },
  { label: 'Connect', href: '#connect' },
]

type SiteHeaderProps = {
  siteName: string
}

export function SiteHeader({ siteName }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/90 bg-stone-950/85 backdrop-blur-md supports-[backdrop-filter]:bg-stone-950/70">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-stone-100 transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
        >
          {siteName.split(' ')[0]}
          <span className="text-stone-500">.</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-stone-400 transition-colors hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#connect"
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-900/30 transition-all hover:bg-sky-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
        >
          Get in touch
        </a>
      </Container>
    </header>
  )
}

export function MobileNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Primary mobile"
      className={cn(
        'border-t border-stone-800/90 bg-stone-950/95 px-4 py-3 backdrop-blur-md md:hidden',
        className,
      )}
    >
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-sm font-medium text-stone-400 transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
