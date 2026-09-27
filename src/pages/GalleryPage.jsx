import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import './GalleryPage.css'

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Battery']

const PHOTOS = [
  { img: 'gal1', category: 'Residential', caption: 'Placeholder rooftop install, residential' },
  { img: 'gal2', category: 'Commercial', caption: 'Placeholder ground-mount array, commercial' },
  { img: 'gal3', category: 'Battery', caption: 'Placeholder battery cabinet install' },
  { img: 'gal4', category: 'Residential', caption: 'Placeholder rooftop install, residential' },
  { img: 'gal5', category: 'Commercial', caption: 'Placeholder rooftop array, commercial' },
  { img: 'gal6', category: 'Residential', caption: 'Placeholder finished install with inverter' },
  { img: 'gal7', category: 'Battery', caption: 'Placeholder backup system wiring' },
  { img: 'gal8', category: 'Commercial', caption: 'Placeholder large-scale array' },
  { img: 'gal9', category: 'Residential', caption: 'Placeholder panel close-up' },
]

// Filterable photo grid + a click-through lightbox. Photography is the
// single most persuasive asset a solar company has (it proves the work
// is real and looks clean) so giving it a dedicated, zoomable page earns
// its own nav slot rather than being buried as a homepage strip.
export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter((p) => p.category === active)

  return (
    <>
      <PageHeader title="Project Gallery" crumb="Gallery" image="gallerybanner" />

      <section className="section gallery">
        <div className="container">
          <div className="gallery-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`filter-btn ${active === c ? 'filter-active' : ''}`}
                onClick={() => { setActive(c); setLightboxIndex(null) }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid" key={active}>
            {filtered.map((photo, i) => (
              <Reveal key={photo.img} delay={i * 70} className="gallery-item">
                <button className="gallery-item-trigger" onClick={() => setLightboxIndex(i)}>
                  <img src={`https://picsum.photos/seed/${photo.img}/500/500`} alt={photo.caption} />
                  <span className="gallery-overlay">
                    <span className="gallery-zoom">🔍 View</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex((idx) => (idx + 1) % filtered.length)}
        onPrev={() => setLightboxIndex((idx) => (idx - 1 + filtered.length) % filtered.length)}
      />

      <CtaBanner />
    </>
  )
}
