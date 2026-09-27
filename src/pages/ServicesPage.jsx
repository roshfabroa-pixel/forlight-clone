import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Process from '../components/Process.jsx'
import Accordion from '../components/Accordion.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import './ServicesPage.css'

const SERVICES = [
  { icon: '☀️', title: 'Residential Installation', desc: 'Placeholder description of home rooftop system design and install.', img: 'svc1' },
  { icon: '🏭', title: 'Commercial & Industrial', desc: 'Placeholder description of large-scale rooftop and ground-mount arrays.', img: 'svc2' },
  { icon: '🔋', title: 'Battery Storage', desc: 'Placeholder description of backup battery sizing and installation.', img: 'svc3' },
  { icon: '🔧', title: 'Repair & Diagnostics', desc: 'Placeholder description of troubleshooting underperforming systems.', img: 'svc4' },
  { icon: '🧰', title: 'Maintenance Plans', desc: 'Placeholder description of scheduled cleaning and inspection visits.', img: 'svc5' },
  { icon: '📊', title: 'Monitoring & Support', desc: 'Placeholder description of production-monitoring app and support line.', img: 'svc6' },
]

const FAQS = [
  { q: 'How long does a typical installation take?', a: 'Placeholder answer — most residential installs are described as completing within one to two days once permits are approved.' },
  { q: 'Do you offer financing?', a: 'Placeholder answer — this would summarize financing partners, loan terms, or lease-to-own options.' },
  { q: 'What warranty comes with the system?', a: 'Placeholder answer — typically covers equipment warranty length and workmanship guarantee period.' },
  { q: 'Will solar work if my roof is shaded?', a: 'Placeholder answer — would explain how a site assessment determines panel placement and expected output.' },
]

// Services page = the "menu" a visitor lands on after the homepage
// teaser. It repeats the how-it-works process (context is cheap to
// re-read, expensive to re-find) and closes with an FAQ, since by this
// point the visitor is evaluating, not just browsing.
export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our Services" crumb="Services" image="servicesbanner" />

      <section className="section services-list">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">What We Offer</span>
            <h2>Full-Service Solar, From Design to Support</h2>
          </Reveal>
          <div className="services-list-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100} className="service-list-card">
                <div className="service-list-media">
                  <img src={`https://picsum.photos/seed/${s.img}/500/320`} alt="" />
                  <span className="service-list-icon">{s.icon}</span>
                </div>
                <div className="service-list-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="section faqs">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Common Questions</span>
            <h2>Solar FAQs</h2>
          </Reveal>
          <Accordion items={FAQS} />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
