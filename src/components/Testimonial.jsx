import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import './Testimonial.css'

const TESTIMONIALS = [
  { name: 'Alex Rivera', role: 'Homeowner', img: 'person1' },
  { name: 'Morgan Lee', role: 'Business Owner', img: 'person2' },
  { name: 'Priya Nair', role: 'Homeowner', img: 'person3' },
]

// Single centered quote with dot navigation. Autoplays every 5s so
// first-time visitors see the slider is a slider without having to
// click — but it pauses on hover/focus so someone actually reading a
// quote isn't fighting the timer.
export default function Testimonial() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = TESTIMONIALS[i]
  const timerRef = useRef(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setI((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [paused])

  return (
    <section className="section testimonial">
      <div
        className="container testimonial-inner"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Reveal className="testimonial-card" key={i}>
          <p className="quote">
            “Placeholder testimonial quote describing a positive experience
            with the installation process, timeline, and after-sales support.”
          </p>
          <img className="quote-avatar" src={`https://picsum.photos/seed/${t.img}/100/100`} alt="" />
          <h4>{t.name}</h4>
          <span className="quote-role">{t.role}</span>
        </Reveal>
        <div className="quote-dots">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === i ? 'dot-active' : ''}`}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
