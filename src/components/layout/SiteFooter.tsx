import { footerNote, site, socialLinks } from '../../data/content'
import { Container } from '../ui/Container'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-stone-800/90 bg-stone-950 py-10 sm:py-12"
      role="contentinfo"
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:items-start sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-stone-100">{site.name}</p>
            <p className="mt-2 max-w-md text-sm text-stone-400">{footerNote}</p>
            <p className="mt-4 text-xs text-stone-500">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
          <nav aria-label="Social and contact">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-sm text-sm font-medium text-stone-400 transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
