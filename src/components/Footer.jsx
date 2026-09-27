import { Link } from 'react-router-dom'
import './Footer.css'

const COLUMNS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'How it Works', to: '/services' },
      { label: 'Blog', to: '/blog' },
      { label: 'Terms of Use', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', to: '/contact' },
      { label: 'Terms & Conditions', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Careers', to: '/contact' },
    ],
  },
]

// Dark 4-column footer over a faint background photo — the darkest,
// most information-dense part of the page, which is standard: by this
// point the visitor is looking for a specific link, not being sold to.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">☀ SUNPEAK</span>
          <p>Power your future with clean energy — placeholder tagline text.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="Instagram">in</a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col">
          <h4>Company Info</h4>
          <ul className="footer-contact">
            <li>📞 (555) 013-4820</li>
            <li>✉️ hello@sunpeaksolar.example</li>
            <li>📍 123 Sunrise Avenue, Meadowbrook</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          All rights reserved © SunPeak Practice Build 2026
        </div>
      </div>
    </footer>
  )
}
