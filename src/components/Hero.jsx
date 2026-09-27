import { Link } from 'react-router-dom'
import './Hero.css'

// Full-bleed photographic hero. A dark gradient overlay keeps white text
// legible regardless of the photo underneath. The request-service card
// is pulled up with a negative margin so it straddles the hero/next
// section boundary — this is what makes the page feel "designed" rather
// than just stacked blocks.
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        <div
          className="hero-bg"
          style={{ backgroundImage: 'url(https://picsum.photos/seed/solarroof/1600/900)' }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <span className="eyebrow eyebrow-light hero-in hero-in-1">SunPeak Solar Installation Service</span>
        <h1 className="hero-title hero-in hero-in-2">
          Power Your Future with Clean Solar Energy
        </h1>
        <p className="hero-text hero-in hero-in-3">
          Lower your electricity bills and invest in a sustainable future with
          professionally engineered solar power systems. This is placeholder
          copy standing in for real marketing content while the layout is
          being practiced.
        </p>
        <div className="hero-actions hero-in hero-in-4">
          <Link to="/services" className="btn btn-primary">Explore More</Link>
          <Link to="/contact" className="btn btn-outline-light">Get a Free Estimate</Link>
        </div>
      </div>

      <button className="hero-arrow hero-arrow-left" aria-label="Previous slide">‹</button>
      <button className="hero-arrow hero-arrow-right" aria-label="Next slide">›</button>

      <div className="request-card container hero-in hero-in-5">
        <div className="request-card-inner">
          <h3 className="request-title">Request Our Service</h3>
          <form className="request-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone number" required />
            <input type="date" placeholder="mm/dd/yyyy" />
            <button type="submit" className="btn btn-primary">Book Now</button>
          </form>
        </div>
      </div>
    </section>
  )
}
