import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccessGate } from './components/AccessGate'
import App from './App'
import { BlogIndex } from './pages/BlogIndex'

const BlogArticle = lazy(() =>
  import('./pages/BlogArticle').then((m) => ({ default: m.BlogArticle })),
)

export function AppRouter() {
  return (
    <AccessGate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={null}>
                <BlogArticle />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AccessGate>
  )
}
