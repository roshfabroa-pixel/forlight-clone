import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// Sticky header that visibly reacts to scroll: it shrinks and gains a
// shadow once the page has moved, which is a small but standard signal
// that "this bar now floats above your content" rather than being part
// of the page flow. NavLink handles the active-route highlight itself —
// no manual pathname matching needed.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu automatically after a link is tapped, so it
  // doesn't stay open covering the page the visitor just navigated to.
  const closeMenu = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link className="logo" to="/">
          <span className="logo-mark">☀</span>
          <span className="logo-text">
            SUN<strong>PEAK</strong>
            <small>SOLAR PRACTICE BUILD</small>
          </span>
        </Link>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary header-cta">
          ⚡ Get a Quote
        </Link>

        <button
          className={`nav-toggle ${open ? 'nav-toggle-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
