import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="container not-found-inner">
        <span className="not-found-code">404</span>
        <h1>This roof isn't wired up yet</h1>
        <p>Placeholder copy — the page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  )
}
