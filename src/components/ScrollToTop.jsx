import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position between route changes (it's
// a SPA, the browser has no page-load to reset on). Without this, clicking
// "Contact" from the bottom of a long page would land you at the bottom
// of the Contact page too.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return null
}
