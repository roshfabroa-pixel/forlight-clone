import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { supabase } from '../lib/supabaseClient.js'
import './ContactPage.css'

const INFO_CARDS = [
  { icon: '📞', title: 'Call Us', line: '(555) 013-4820', href: 'tel:+15550134820' },
  { icon: '✉️', title: 'Email Us', line: 'hello@sunpeaksolar.example', href: 'mailto:hello@sunpeaksolar.example' },
  { icon: '📍', title: 'Visit Us', line: '123 Sunrise Avenue, Meadowbrook', href: '#' },
  { icon: '🕒', title: 'Office Hours', line: 'Mon–Sat, 8am–6pm', href: '#' },
]

// A real contact form: it validates required fields, writes the
// submission to a Supabase table, then swaps to a confirmation message.
// If Supabase isn't configured (e.g. local dev with no .env.local yet)
// it fails visibly instead of pretending to succeed — see the "error"
// status branch below.
export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      interest: form.interest.value,
      message: form.message.value,
    }

    if (!supabase) {
      console.error('Supabase is not configured — see src/lib/supabaseClient.js')
      setStatus('error')
      return
    }

    setStatus('submitting')
    const { error } = await supabase.from('contact_submissions').insert([payload])

    if (error) {
      console.error('Supabase insert failed:', error.message)
      setStatus('error')
      return
    }

    form.reset()
    setStatus('sent')
  }

  return (
    <>
      <PageHeader title="Get in Touch" crumb="Contact" image="contactbanner" />

      <section className="section contact">
        <div className="container contact-grid">
          <Reveal className="contact-form-card">
            <h2>Request a Free Estimate</h2>
            <p className="contact-form-sub">
              Placeholder copy inviting the visitor to send project details for a quote.
            </p>

            {status === 'sent' ? (
              <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <h3>Thanks — message received!</h3>
                <p>Placeholder confirmation copy. Your team can view this in the Supabase table editor.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <p className="contact-error">
                    Something went wrong sending your message. Please try again, or call us directly.
                  </p>
                )}
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" required placeholder="Jane Rivera" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" required placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" required placeholder="jane@example.com" />
                </div>
                <div className="form-field">
                  <label htmlFor="interest">I'm Interested In</label>
                  <select id="interest" name="interest" defaultValue="Residential Installation">
                    <option>Residential Installation</option>
                    <option>Commercial Installation</option>
                    <option>Battery Storage</option>
                    <option>Repair / Maintenance</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell us a bit about your project..." />
                </div>
                <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={150} className="contact-info">
            {INFO_CARDS.map((c) => (
              <a className="contact-info-card" href={c.href} key={c.title}>
                <span className="contact-info-icon">{c.icon}</span>
                <div>
                  <h4>{c.title}</h4>
                  <span>{c.line}</span>
                </div>
              </a>
            ))}
            <div className="contact-map">
              <img src="https://picsum.photos/seed/mapplaceholder/500/280" alt="Placeholder map graphic" />
              <span className="contact-map-label">📍 Service Area Map (placeholder)</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
