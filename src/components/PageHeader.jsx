import { Link } from 'react-router-dom'
import './PageHeader.css'

// Every inner page (About, Services, Gallery, Blog, Contact) opens with
// this same banner: photo + navy scrim + title + breadcrumb. Repeating
// it verbatim across pages is what makes the site feel like one system
// rather than five unrelated templates stitched together.
export default function PageHeader({ title, crumb, image = 'pagehero' }) {
  return (
    <section
      className="page-header"
      style={{ backgroundImage: `url(https://picsum.photos/seed/${image}/1600/500)` }}
    >
      <div className="page-header-overlay" />
      <div className="container page-header-inner">
        <h1>{title}</h1>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="breadcrumb-current">{crumb}</span>
        </nav>
      </div>
    </section>
  )
}
