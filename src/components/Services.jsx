import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './Services.css'

const SERVICES = [
  { icon: '⚡', title: 'Solar Installation', desc: 'Placeholder blurb about full-system installation service.' },
  { icon: '🔧', title: 'System Repair', desc: 'Placeholder blurb about diagnostics and repair service.' },
  { icon: '🧰', title: 'Maintenance Plans', desc: 'Placeholder blurb about scheduled maintenance visits.' },
  { icon: '📋', title: 'Site Consultation', desc: 'Placeholder blurb about on-site assessment and quoting.' },
]

// Dark section breaks the light/gray/light rhythm of the page — a
// deliberate contrast beat so the "Services" content reads as a
// distinct, important block rather than blending into neighboring
// sections. Icon tiles use translucent white cards over navy so they
// don't need separate image assets.
export default function Services() {
  return (
    <section className="section services">
      <div className="container services-grid">
        <Reveal className="services-intro">
          <span className="eyebrow">Our Services</span>
          <h2>Full-Service Solar, Start to Finish</h2>
          <p>
            Placeholder paragraph summarizing the range of services offered,
            meant to set up the icon grid to the right.
          </p>
          <Link to="/services" className="btn btn-outline-light">See More</Link>
        </Reveal>
        <div className="services-cards">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="service-card">
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
