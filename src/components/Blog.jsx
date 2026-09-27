import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { POSTS, FILTERS } from '../data/posts.js'
import './Blog.css'

// Used two ways: as a 3-post teaser on the homepage (`limit={3}`, with a
// "View All Posts" link out to the full page) and as the complete,
// filterable grid on /blog (no limit). Filtering actually narrows the
// visible cards here — each card re-mounts with a fresh Reveal animation
// when the filter changes, so switching tabs feels responsive rather
// than just re-painting instantly.
export default function Blog({ limit, showFilters = true, showHeading = true }) {
  const [active, setActive] = useState(FILTERS[0])

  const filtered = active === 'All Posts' ? POSTS : POSTS.filter((p) => p.tag === active)
  const visible = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="section blog">
      <div className="container">
        {showHeading && (
          <Reveal className="section-head center">
            <span className="eyebrow">Our Blog</span>
            <h2>Updates from the Solar World</h2>
            <p className="blog-subtitle">
              Placeholder subtitle describing the kind of articles found below.
            </p>
          </Reveal>
        )}

        {showFilters && (
          <div className="blog-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${active === f ? 'filter-active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div className="blog-grid" key={active}>
          {visible.map((post, i) => (
            <Reveal as="article" key={post.slug} delay={i * 90} className="blog-card">
              <div className="blog-card-media">
                <img src={`https://picsum.photos/seed/${post.img}/500/320`} alt="" />
              </div>
              <div className="blog-card-body">
                <span className="blog-tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <span className="blog-date">{post.date} · 1 Comment</span>
                <p>
                  Placeholder excerpt text giving a short teaser of the
                  article content before the reader clicks through.
                </p>
                <Link to="/blog" className="read-more">Read More →</Link>
              </div>
            </Reveal>
          ))}
        </div>

        {limit && (
          <div className="blog-view-all">
            <Link to="/blog" className="btn btn-outline">View All Posts</Link>
          </div>
        )}
      </div>
    </section>
  )
}
