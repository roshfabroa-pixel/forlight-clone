import './TopBar.css'

// Thin utility bar above the main header. Its only job is to surface
// quick contact info before the visitor even reaches navigation — a
// common local-service-business pattern.
export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <span className="topbar-item">📍 123 Sunrise Avenue, Meadowbrook</span>
        <span className="topbar-item topbar-center">✉️ hello@sunpeaksolar.example</span>
        <span className="topbar-item">📞 (555) 013-4820</span>
      </div>
    </div>
  )
}
