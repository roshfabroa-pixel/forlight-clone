import useInView from '../hooks/useInView.js'

// Wrap any block in <Reveal> to fade+slide it in once scrolled into view.
// `delay` (ms) staggers siblings — e.g. a row of 4 cards passing
// delay={i * 100} feels like they're arriving one after another instead
// of all popping at once.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
