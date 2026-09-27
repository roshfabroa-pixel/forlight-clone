import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './Features.css'

const POINTS = [
  'Placeholder benefit statement about installation quality.',
  'Placeholder benefit statement about equipment warranties.',
  'Placeholder benefit statement about maintenance support.',
  'Placeholder benefit statement about certified technicians.',
]

// Two overlapping photos plus a dotted-square accent behind them —
// a decorative motif that costs nothing (pure CSS radial-gradient)
// but adds texture so the section doesn't feel like a flat photo grid.
export default function Features() {
  return (
    <section className="section features">
      <div className="container features-grid">
        <Reveal className="features-media">
          <div className="dot-pattern dot-block dot-top" />
          <img className="features-img-back" src="https://picsum.photos/seed/electrician1/420/300" alt="" />
          <img className="features-img-front" src="https://picsum.photos/seed/electrician2/420/460" alt="" />
          <div className="dot-pattern dot-block dot-bottom" />
        </Reveal>
        <Reveal delay={150} className="features-copy">
          <span className="eyebrow">Why Choose Us</span>
          <h2>Comprehensive Solar Solutions, Done Right</h2>
          <p>
            Placeholder introductory sentence describing the company's overall
            approach to project quality and customer service.
          </p>
          <ul className="checklist">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p} delay={200 + i * 100}>
                <span className="check-icon">✓</span>
                {p}
              </Reveal>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary">Explore More</Link>
        </Reveal>
      </div>
    </section>
  )
}
