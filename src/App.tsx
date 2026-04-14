import { SiteFooter } from './components/layout/SiteFooter'
import { MobileNav, SiteHeader } from './components/layout/SiteHeader'
import { Blog } from './components/sections/Blog'
import { CareerTimeline } from './components/sections/CareerTimeline'
import { Expertise } from './components/sections/Expertise'
import { FinalCTA } from './components/sections/FinalCTA'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { site } from './data/content'

function App() {
  return (
    <div className="min-h-svh">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-lg focus:bg-sky-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-stone-950 focus:[clip:auto] focus:[clip-path:none] focus:whitespace-normal"
      >
        Skip to main content
      </a>
      <SiteHeader siteName={site.name} />
      <MobileNav />
      <main id="main-content">
        <Hero />
        <CareerTimeline />
        <Projects />
        <Expertise />
        <Blog />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
