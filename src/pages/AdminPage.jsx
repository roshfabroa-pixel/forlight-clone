import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import './AdminPage.css'

const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Lost']

// Not linked from the nav or footer anywhere — the URL itself isn't the
// security boundary, Supabase Auth is. Nobody gets past the login form
// without real credentials, and once past it, Row Level Security on the
// `contact_submissions` table (see supabase-admin-setup.sql) is what
// actually decides whether reads/writes succeed, not this component.
export default function AdminPage() {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [leads, setLeads] = useState([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [savingId, setSavingId] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (!supabase) {
      setSession(null)
      return
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchLeads()
  }, [session])

  async function fetchLeads() {
    setLoadingLeads(true)
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setLeads(data)
    setLoadingLeads(false)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
    setAuthLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function updateLead(id, patch) {
    setSavingId(id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l))) // optimistic
    const { error } = await supabase.from('contact_submissions').update(patch).eq('id', id)
    if (error) fetchLeads() // roll back to server truth on failure
    setSavingId(null)
  }

  if (session === undefined) {
    return <div className="admin-loading">Loading…</div>
  }

  if (!supabase || !session) {
    return (
      <div className="admin-login-wrap">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          <p>Sign in to view and manage leads from the contact form.</p>
          {!supabase && <p className="admin-error">Supabase isn't configured on this deployment.</p>}
          {authError && <p className="admin-error">{authError}</p>}
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={authLoading}>
            {authLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    )
  }

  const visible = filter === 'All' ? leads : leads.filter((l) => l.status === filter)

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Leads</h1>
          <span>{session.user.email}</span>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="admin-filters">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            className={`admin-filter-btn ${filter === s ? 'admin-filter-active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
        <button className="admin-refresh" onClick={fetchLeads} disabled={loadingLeads}>
          {loadingLeads ? 'Refreshing…' : '↻ Refresh'}
        </button>
      </div>

      {visible.length === 0 && !loadingLeads && (
        <p className="admin-empty">No leads {filter !== 'All' ? `with status "${filter}"` : 'yet'}.</p>
      )}

      <div className="admin-list">
        {visible.map((lead) => (
          <div className="admin-card" key={lead.id}>
            <div className="admin-card-main">
              <div>
                <h3>{lead.name}</h3>
                <span className="admin-date">
                  {new Date(lead.created_at).toLocaleString()}
                </span>
              </div>
              <select
                value={lead.status}
                onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                className={`admin-status admin-status-${lead.status.toLowerCase()}`}
                disabled={savingId === lead.id}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="admin-card-details">
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
              {lead.phone && <a href={`tel:${lead.phone}`}>{lead.phone}</a>}
              {lead.interest && <span className="admin-tag">{lead.interest}</span>}
            </div>

            {lead.message && <p className="admin-message">{lead.message}</p>}

            <textarea
              className="admin-notes"
              placeholder="Internal notes… (saves automatically on blur)"
              defaultValue={lead.notes || ''}
              onBlur={(e) => {
                if (e.target.value !== (lead.notes || '')) {
                  updateLead(lead.id, { notes: e.target.value })
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
