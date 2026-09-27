import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import ScrollToTop from './ScrollToTop.jsx'

// Everything that must stay identical across every page — top bar, main
// nav, footer, back-to-top button — lives here once. <Outlet /> is where
// React Router swaps in the current page's content.
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
