import useInView from '../hooks/useInView.js'
import useCountUp from '../hooks/useCountUp.js'
import './Stats.css'

const STATS = [
  { target: 12, suffix: '+', label: 'Years in Business' },
  { target: 3200, suffix: '+', label: 'Systems Installed' },
  { target: 45, suffix: 'MW', label: 'Capacity Delivered' },
  { target: 98, suffix: '%', label: 'Customer Satisfaction' },
]

function Stat({ target, suffix, label, active }) {
  const value = useCountUp(target, active)
  return (
    <div className="stat">
      <span className="stat-number">
        {value.toLocaleString()}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// A thin, high-contrast trust bar right under the hero. Solar is a
// high-ticket purchase — before a visitor reads anything else, this
// answers "is this company established enough to trust with $20k?"
// Negative margin pulls it up so it visually anchors to the hero above.
export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.4 })

  return (
    <section className="stats-bar" ref={ref}>
      <div className="container stats-grid">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} active={inView} />
        ))}
      </div>
    </section>
  )
}
