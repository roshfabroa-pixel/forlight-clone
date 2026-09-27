import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Stats from '../components/Stats.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import './AboutPage.css'

const VALUES = [
  { icon: '🎯', title: 'Precision Engineering', desc: 'Placeholder copy about designing systems sized to real usage, not guesswork.' },
  { icon: '🤝', title: 'Straight Answers', desc: 'Placeholder copy about transparent pricing with no hidden fees.' },
  { icon: '🛡️', title: 'Built to Last', desc: 'Placeholder copy about workmanship warranties and premium components.' },
]

const TEAM = [
  { name: 'Jordan Ellery', role: 'Founder & Lead Engineer', img: 'team1' },
  { name: 'Sam Whitfield', role: 'Head of Installations', img: 'team2' },
  { name: 'Rae Monclair', role: 'Customer Success Lead', img: 'team3' },
  { name: 'Devon Achara', role: 'Systems Designer', img: 'team4' },
]

// The About page exists to answer one question a homepage teaser can't:
// "who exactly am I trusting with a $20k install?" So it leans on three
// trust devices in sequence — founder story, stated values, real faces —
// each a well-worn but effective pattern for service businesses.
export default function AboutPage() {
  return (
    <>
      <PageHeader title="About SunPeak Solar" crumb="About" image="aboutbanner" />

      <section className="section about-story">
        <div className="container about-story-grid">
          <Reveal className="about-story-media">
            <img src="https://picsum.photos/seed/foundercrew/650/520" alt="Placeholder photo of the founding team" />
          </Reveal>
          <Reveal delay={150} className="about-story-copy">
            <span className="eyebrow">Our Story</span>
            <h2>Twelve Years of Placeholder Growth, One Roof at a Time</h2>
            <p>
              Placeholder paragraph describing how the company started, what
              problem it set out to solve, and how it has grown since. This
              stands in for real founder-story copy.
            </p>
            <p>
              A second placeholder paragraph would typically cover milestones —
              first 100 installs, a service-area expansion, a certification
              earned — building a timeline of credibility.
            </p>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="section values">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">What We Stand For</span>
            <h2>The Values Behind Every Installation</h2>
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section team">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Meet the Team</span>
            <h2>The People Behind the Panels</h2>
          </Reveal>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 100} className="team-card">
                <div className="team-photo">
                  <img src={`https://picsum.photos/seed/${member.img}/320/380`} alt="" />
                </div>
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
