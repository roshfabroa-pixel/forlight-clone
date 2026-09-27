import { useState } from 'react'
import Reveal from './Reveal.jsx'
import './Accordion.css'

// Single-open FAQ accordion. Solar purchases stall on unanswered
// questions (financing, permits, warranty) more than almost any other
// home-improvement category, so a working FAQ is functionally part of
// the sales page, not just decoration.
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <Reveal key={item.q} delay={i * 60} className={`accordion-item ${isOpen ? 'accordion-open' : ''}`}>
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="accordion-panel" style={{ maxHeight: isOpen ? '260px' : '0px' }}>
              <p>{item.a}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
