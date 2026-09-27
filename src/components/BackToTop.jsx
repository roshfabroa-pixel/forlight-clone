import { useEffect, useState } from 'react'
import './BackToTop.css'

// Appears once the visitor has scrolled past the hero. On a long page
// like this one, giving people an obvious way back to the top (and the
// nav/CTA up there) reduces the "I'm lost, I'll just leave" bounce.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-to-top ${visible ? 'back-to-top-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
