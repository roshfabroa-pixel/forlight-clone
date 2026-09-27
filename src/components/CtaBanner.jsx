import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import './CtaBanner.css'

// A single-purpose conversion strip: white card floating on a gray
// section background. Sits deliberately between the informational
// content above and the blog/testimonial content below, giving anyone
// who scrolled this far a low-effort exit to convert.
export default function CtaBanner() {
  return (
    <section className="section cta-banner-section">
      <div className="container">
        <Reveal className="cta-card">
          <div>
            <h3>Reduce Your Electric Bill to Zero</h3>
            <p>Schedule your free site visit today — placeholder supporting copy.</p>
          </div>
          <div className="cta-actions">
            <a href="tel:+15550134820" className="btn btn-outline">📞 Call Us</a>
            <Link to="/contact" className="btn btn-navy">Free Estimate</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
