import Reveal from './Reveal.jsx'
import './Process.css'

const STEPS = [
  { n: '01', icon: '📋', title: 'Free Consultation', desc: 'Placeholder copy: we assess your roof, energy usage, and goals at no cost.' },
  { n: '02', icon: '📐', title: 'Custom Design', desc: 'Placeholder copy: engineers size a system around your actual consumption.' },
  { n: '03', icon: '🔧', title: 'Professional Install', desc: 'Placeholder copy: certified crews complete most installs in a single day.' },
  { n: '04', icon: '📊', title: 'Monitor & Save', desc: 'Placeholder copy: track production and savings from an app after activation.' },
]

// A numbered horizontal process strip. High-ticket / unfamiliar
// purchases (like a home solar system) convert better when the buyer
// can see the whole journey up front — this answers "what happens after
// I click Get a Quote?" before they ever have to ask.
export default function Process() {
  return (
    <section className="section process">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">How It Works</span>
          <h2>From Consultation to Clean Power in 4 Steps</h2>
        </Reveal>

        <div className="process-grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="process-step">
              <span className="process-number">{s.n}</span>
              <span className="process-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && <span className="process-connector" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
