import { useEffect, useState } from 'react'

// Animates 0 -> target once `start` flips true, using requestAnimationFrame
// so it stays smooth without pulling in a library. Used by the stats bar
// to give the numbers some life instead of just appearing.
export default function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    let frame
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // ease-out cubic: fast start, gentle settle
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return value
}
