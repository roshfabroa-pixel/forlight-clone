import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './SolarTypes.css'

const TYPES = [
  { title: 'Grid-Tied Solar', img: 'panel1', desc: 'Placeholder description of a grid-connected system option and its benefits.' },
  { title: 'Hybrid Solar', img: 'panel2', desc: 'Placeholder description covering battery backup combined with grid power.' },
  { title: 'Off-Grid Solar', img: 'panel3', desc: 'Placeholder description of a fully independent, battery-only system.' },
]

// Photo cards with a dark gradient scrim so white title text stays
// readable over any image — the middle card is slightly taller to
// create rhythm, mirroring the staggered-height pattern on the source.
// Each card reveals with a small delay after its neighbor so the row
// arrives left-to-right instead of popping in together.
export default function SolarTypes() {
  return (
    <section className="section solar-types">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">What We Offer</span>
          <h2>Solar System Types We Install</h2>
        </Reveal>
        <div className="types-grid">
          {TYPES.map((t, i) => (
            <Reveal key={t.title} delay={i * 120} className={`type-card ${i === 1 ? 'type-card-tall' : ''}`}>
              <img src={`https://picsum.photos/seed/${t.img}/500/650`} alt="" />
              <div className="type-scrim" />
              <div className="type-body">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <Link to="/services" className="btn btn-primary">See More</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
