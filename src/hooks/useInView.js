import { useEffect, useRef, useState } from 'react'

// Shared scroll-reveal primitive. Returns a ref to attach to any element
// plus a boolean that flips to true the first time that element crosses
// into the viewport. Using IntersectionObserver (not a scroll listener)
// keeps this cheap — the browser does the work, we just get a callback.
export default function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who've asked the OS for less motion: show content
    // immediately instead of animating it in.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // animate in once, don't re-trigger on scroll-back
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
