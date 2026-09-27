import { useEffect } from 'react'
import './Lightbox.css'

// Minimal image lightbox: click a gallery thumbnail, see it full-size
// with prev/next and Escape-to-close. No library — just a fixed overlay
// and keyboard listener, which is all this needs.
export default function Lightbox({ images, index, onClose, onNext, onPrev }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  if (index === null) return null
  const item = images[index]

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        ‹
      </button>
      <img
        className="lightbox-img"
        src={`https://picsum.photos/seed/${item.img}/1000/700`}
        alt={item.caption}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        ›
      </button>
      <span className="lightbox-caption">{item.caption}</span>
    </div>
  )
}
