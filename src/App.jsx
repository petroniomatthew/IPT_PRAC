const Icon = ({ children, size = 20 }) => (
  <svg
    aria-hidden="true"
    className="icon"
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
  >
    {children}
  </svg>
)

const DashboardIcon = () => (
  <Icon>
    <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="7" x="3" y="3" />
    <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="7" x="14" y="3" />
    <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="7" x="3" y="14" />
    <rect height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="7" x="14" y="14" />
  </Icon>
)

const TicketIcon = ({ size }) => (
  <Icon size={size}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V9a3 3 0 0 0 0 6v3.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V15a3 3 0 0 0 0-6V5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    <path d="M9 8h6M9 12h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
)

const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3.25 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
)

const CheckIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="m8.25 12.2 2.45 2.45 5.25-5.3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
)

const AlertIcon = () => (
  <Icon>
    <path d="M12 3.5 21 20H3L12 3.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    <path d="M12 9v4.5M12 17h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </Icon>
)

const SearchIcon = () => (
  <Icon size={18}>
    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
    <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
)

const BellIcon = () => (
  <Icon>
    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    <path d="M14 20a2.4 2.4 0 0 1-4 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
)

const stats = [
  { label: 'Total tickets', value: '0', detail: 'All support requests', icon: <TicketIcon />, tone: 'blue' },
  { label: 'Open tickets', value: '0', detail: 'Waiting for support', icon: <AlertIcon />, tone: 'orange' },
  { label: 'In progress', value: '0', detail: 'Currently being handled', icon: <ClockIcon />, tone: 'violet' },
  { label: 'Resolved', value: '0', detail: 'Successfully completed', icon: <CheckIcon />, tone: 'green' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="Support Desk home">
          <span className="brand-mark"><TicketIcon size={24} /></span>
          <span><strong>Support</strong><small>Help Desk</small></span>
        </a>

        <nav aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          <a className="nav-item active" href="#dashboard"><DashboardIcon /> Dashboard</a>
          <a className="nav-item" href="#tickets"><TicketIcon /> Tickets <span className="nav-count">0</span></a>
        </nav>

        <div className="support-card">
          <span className="support-card-icon"><TicketIcon size={22} /></span>
          <strong>Support workspace</strong>
          <p>Manage employee requests from one organized dashboard.</p>
        </div>

        <div className="profile">
          <span className="avatar">SA</span>
          <span><strong>Support Agent</strong><small>Support team</small></span>
          <button aria-label="Open profile menu" type="button">•••</button>
        </div>
      </aside>

      <main id="top">
        <header className="topbar">
          <label className="search-box">
            <SearchIcon />
            <span className="sr-only">Search tickets</span>
            <input placeholder="Search tickets..." type="search" />
            <kbd>⌘ K</kbd>
          </label>
          <button className="icon-button" aria-label="Notifications" type="button"><BellIcon /><span /></button>
          <div className="topbar-divider" />
          <div className="availability"><i /> Available</div>
        </header>

        <section className="content" id="dashboard">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">Support overview</p>
              <h1>Good day, Support Agent</h1>
              <p>Here’s what’s happening with your help desk today.</p>
            </div>
            <p className="date-pill" aria-label="Current dashboard context"><span>●</span> Live workspace</p>
          </div>

          <div className="stats-grid" aria-label="Ticket summary">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <div className={`stat-icon ${stat.tone}`}>{stat.icon}</div>
                <div className="stat-copy">
                  <p>{stat.label}</p>
                  <strong>{stat.value}</strong>
                  <small>{stat.detail}</small>
                </div>
              </article>
            ))}
          </div>

          <section className="workspace-card" id="tickets">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ticket queue</p>
                <h2>Recent tickets</h2>
                <p>New employee requests will appear here.</p>
              </div>
              <button className="secondary-button" type="button">View all tickets <span>→</span></button>
            </div>

            <div className="empty-state">
              <div className="empty-illustration">
                <span className="paper paper-back" />
                <span className="paper paper-front"><TicketIcon size={32} /></span>
                <span className="spark spark-one">+</span>
                <span className="spark spark-two">•</span>
              </div>
              <h3>Your queue is clear</h3>
              <p>There are no support tickets to review yet. New requests will show up here automatically.</p>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}

export default App
