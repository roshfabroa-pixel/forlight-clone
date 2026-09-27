import Reveal from './Reveal.jsx'
import './About.css'

// Classic two-column "About" layout: image on one side, copy + signature
// on the other. The signature is a script-font flourish that signals
// "a real person/team stands behind this," a trust cue common on
// service-business sites. Image and copy reveal on slightly different
// delays so they don't arrive as one flat block.
export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <Reveal className="about-media">
          <img src="https://picsum.photos/seed/solarcrew/700/560" alt="Placeholder photo of an installation crew" />
        </Reveal>
        <Reveal delay={150} className="about-copy">
          <span className="eyebrow">About Us</span>
          <h2>Our Solar Team: Experts in Clean Energy Installation</h2>
          <p>
            This paragraph is placeholder text standing in for a short company
            story. It would normally cover how long the team has operated,
            what makes their installs different, and why customers trust them
            with a major home investment.
          </p>
          <p>
            A second placeholder paragraph continues the story, mentioning
            certifications, service area, or a guarantee — details that build
            credibility before the visitor scrolls further.
          </p>
          <p className="signature">Jordan Ellery</p>
          <span className="signature-caption">Founder, SunPeak Solar</span>
        </Reveal>
      </div>
    </section>
  )
}
