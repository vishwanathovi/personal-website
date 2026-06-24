import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { BlogIndex } from './pages/BlogIndex'
import { BlogArticle } from './pages/BlogArticle'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>
    </BrowserRouter>
  )
}
