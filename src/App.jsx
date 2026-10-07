import { useEffect, useState } from 'react'

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

const RefreshIcon = () => (
  <Icon size={17}>
    <path d="M20 6v5h-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    <path d="M18.2 15a7.5 7.5 0 1 1-.3-8.4L20 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
)

const BellIcon = () => (
  <Icon>
    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    <path d="M14 20a2.4 2.4 0 0 1-4 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
)

const initialTickets = [
  { id: 'TKT-1048', title: 'Unable to connect to office Wi-Fi', requester: 'Maria Santos', initials: 'MS', email: 'maria.santos@company.test', department: 'Finance', category: 'Network', priority: 'High', status: 'Open', submitted: '8 min ago', created: 'Oct 7, 2026 at 10:42 PM', updated: 'Oct 7, 2026 at 10:42 PM', description: 'My laptop disconnects from the office Wi-Fi every few minutes. I have restarted it and forgotten the network, but the issue continues.' },
  { id: 'TKT-1047', title: 'Microsoft Teams microphone not detected', requester: 'Joshua Lim', initials: 'JL', email: 'joshua.lim@company.test', department: 'Sales', category: 'Software', priority: 'Medium', status: 'In progress', submitted: '24 min ago', created: 'Oct 7, 2026 at 10:26 PM', updated: 'Oct 7, 2026 at 10:34 PM', description: 'Teams cannot find my headset microphone during calls, although the headset works in other applications.' },
  { id: 'TKT-1046', title: 'Request for shared drive access', requester: 'Anna Reyes', initials: 'AR', email: 'anna.reyes@company.test', department: 'Operations', category: 'Access', priority: 'Low', status: 'Open', submitted: '1 hr ago', created: 'Oct 7, 2026 at 9:48 PM', updated: 'Oct 7, 2026 at 9:48 PM', description: 'Please grant me access to the Operations shared drive for the quarterly inventory review.' },
  { id: 'TKT-1045', title: 'Laptop freezes during startup', requester: 'Carlo Mendoza', initials: 'CM', email: 'carlo.mendoza@company.test', department: 'Marketing', category: 'Hardware', priority: 'High', status: 'In progress', submitted: '2 hrs ago', created: 'Oct 7, 2026 at 8:53 PM', updated: 'Oct 7, 2026 at 9:20 PM', description: 'The company laptop becomes unresponsive on the loading screen and requires several restarts before reaching the desktop.' },
  { id: 'TKT-1044', title: 'Password reset request', requester: 'Bea Cruz', initials: 'BC', email: 'bea.cruz@company.test', department: 'Human Resources', category: 'Account', priority: 'Medium', status: 'Resolved', submitted: 'Yesterday', created: 'Oct 6, 2026 at 4:16 PM', updated: 'Oct 6, 2026 at 4:31 PM', description: 'I am locked out of my employee account after changing phones and need my password reset.' },
  { id: 'TKT-1043', title: 'Printer queue is not responding', requester: 'Noel Garcia', initials: 'NG', email: 'noel.garcia@company.test', department: 'Administration', category: 'Hardware', priority: 'Low', status: 'Resolved', submitted: 'Yesterday', created: 'Oct 6, 2026 at 2:05 PM', updated: 'Oct 6, 2026 at 3:12 PM', description: 'Documents sent to the second-floor printer stay in the queue and never begin printing.' },
]

function App() {
  const [tickets, setTickets] = useState([])
  const [loadState, setLoadState] = useState('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [updatedTicket, setUpdatedTicket] = useState(null)
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  useEffect(() => {
    setLoadState('loading')
    setUpdatedTicket(null)

    const loadingTimer = window.setTimeout(() => {
      const shouldShowDemoError = new URLSearchParams(window.location.search).get('ticketError') === 'true'

      if (shouldShowDemoError && loadAttempt === 0) {
        setTickets([])
        setLoadState('error')
        return
      }

      setTickets(initialTickets)
      setLoadState('success')
    }, 700)

    return () => window.clearTimeout(loadingTimer)
  }, [loadAttempt])

  const updateTicketStatus = (ticketId, status) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket,
      ),
    )
    setUpdatedTicket({ id: ticketId, status })
  }

  const ticketCounts = tickets.reduce(
    (counts, ticket) => ({ ...counts, [ticket.status]: counts[ticket.status] + 1 }),
    { Open: 0, 'In progress': 0, Resolved: 0 },
  )

  const stats = [
    { label: 'Total tickets', value: loadState === 'success' ? tickets.length : '—', detail: 'All support requests', icon: <TicketIcon />, tone: 'blue' },
    { label: 'Open tickets', value: loadState === 'success' ? ticketCounts.Open : '—', detail: 'Waiting for support', icon: <AlertIcon />, tone: 'orange' },
    { label: 'In progress', value: loadState === 'success' ? ticketCounts['In progress'] : '—', detail: 'Currently being handled', icon: <ClockIcon />, tone: 'violet' },
    { label: 'Resolved', value: loadState === 'success' ? ticketCounts.Resolved : '—', detail: 'Successfully completed', icon: <CheckIcon />, tone: 'green' },
  ]

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
          <a className="nav-item" href="#tickets"><TicketIcon /> Tickets <span className="nav-count">{loadState === 'success' ? tickets.length : '—'}</span></a>
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
                <p>All employee support requests in one place.</p>
              </div>
              <p className="ticket-total"><strong>{loadState === 'success' ? tickets.length : '—'}</strong> total tickets</p>
            </div>

            {updatedTicket && (
              <div className="update-confirmation" role="status">
                <span><CheckIcon /></span>
                <p><strong>{updatedTicket.id}</strong> moved to {updatedTicket.status}.</p>
                <button aria-label="Dismiss status update message" onClick={() => setUpdatedTicket(null)} type="button">×</button>
              </div>
            )}

            {loadState === 'loading' && (
              <div className="loading-state" aria-live="polite" aria-busy="true">
                <div className="loading-heading">
                  <span className="spinner" />
                  <div><strong>Loading tickets</strong><p>Getting the latest support requests…</p></div>
                </div>
                <div className="skeleton-table" aria-hidden="true">
                  {[1, 2, 3, 4].map((row) => (
                    <div className="skeleton-row" key={row}>
                      <span className="skeleton wide" /><span className="skeleton medium" /><span className="skeleton short" /><span className="skeleton short" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loadState === 'error' && (
              <div className="error-state" role="alert">
                <span className="error-icon"><AlertIcon /></span>
                <h3>We couldn’t load the tickets</h3>
                <p>Something interrupted the request. Check your connection and try again.</p>
                <button onClick={() => setLoadAttempt((attempt) => attempt + 1)} type="button"><RefreshIcon /> Try again</button>
              </div>
            )}

            {loadState === 'success' && <div className="table-scroll">
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th scope="col">Ticket</th>
                    <th scope="col">Requester</th>
                    <th scope="col">Category</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    <th scope="col">Submitted</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td data-label="Ticket">
                        <span className="ticket-id">{ticket.id}</span>
                        <strong className="ticket-title">{ticket.title}</strong>
                      </td>
                      <td data-label="Requester">
                        <span className="requester">
                          <span className="requester-avatar">{ticket.initials}</span>
                          {ticket.requester}
                        </span>
                      </td>
                      <td data-label="Category"><span className="category-label">{ticket.category}</span></td>
                      <td data-label="Priority"><span className={`priority priority-${ticket.priority.toLowerCase()}`}><i />{ticket.priority}</span></td>
                      <td data-label="Status">
                        <label className={`status-control status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                          <span className="sr-only">Update status for {ticket.id}</span>
                          <select
                            aria-label={`Update status for ${ticket.id}`}
                            onChange={(event) => updateTicketStatus(ticket.id, event.target.value)}
                            value={ticket.status}
                          >
                            <option value="Open">Open</option>
                            <option value="In progress">In progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                          <span className="select-arrow" aria-hidden="true">⌄</span>
                        </label>
                      </td>
                      <td data-label="Submitted"><time>{ticket.submitted}</time></td>
                      <td className="actions-cell">
                        <button className="details-button" onClick={() => setSelectedTicketId(ticket.id)} type="button">
                          View details <span aria-hidden="true">→</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
          </section>
        </section>
      </main>

      {selectedTicket && (
        <div className="details-layer" role="presentation">
          <button className="details-backdrop" aria-label="Close ticket details" onClick={() => setSelectedTicketId(null)} type="button" />
          <aside aria-labelledby="details-title" aria-modal="true" className="details-panel" role="dialog">
            <header className="details-header">
              <div>
                <p className="eyebrow">Ticket details</p>
                <span>{selectedTicket.id}</span>
              </div>
              <button className="close-button" aria-label="Close ticket details" onClick={() => setSelectedTicketId(null)} type="button">×</button>
            </header>

            <div className="details-content">
              <div className="details-title-row">
                <span className={`priority priority-${selectedTicket.priority.toLowerCase()}`}><i />{selectedTicket.priority} priority</span>
                <span className={`status detail-status status-${selectedTicket.status.toLowerCase().replace(' ', '-')}`}>{selectedTicket.status}</span>
              </div>
              <h2 id="details-title">{selectedTicket.title}</h2>

              <section className="description-card">
                <h3>Description</h3>
                <p>{selectedTicket.description}</p>
              </section>

              <section className="detail-section">
                <h3>Requester</h3>
                <div className="requester-profile">
                  <span className="requester-avatar detail-avatar">{selectedTicket.initials}</span>
                  <div><strong>{selectedTicket.requester}</strong><a href={`mailto:${selectedTicket.email}`}>{selectedTicket.email}</a></div>
                </div>
              </section>

              <dl className="detail-grid">
                <div><dt>Department</dt><dd>{selectedTicket.department}</dd></div>
                <div><dt>Category</dt><dd>{selectedTicket.category}</dd></div>
                <div><dt>Created</dt><dd>{selectedTicket.created}</dd></div>
                <div><dt>Last updated</dt><dd>{selectedTicket.updated}</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
