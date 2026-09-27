import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

// Every nav link now points at a real route instead of a same-page
// anchor. <Layout> holds the header/footer once; <Routes> swaps only
// the page content in between, so navigating feels instant (no full
// reload) while still behaving like separate pages — real URLs, working
// back/forward, and a scroll reset on every navigation.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* Deliberately outside <Layout> — no public nav/footer chrome
            around the admin tool, and Supabase Auth (not the URL) is
            the actual access boundary. */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
