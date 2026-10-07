import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'employee-tickets'
const initialForm = {
  title: '',
  description: '',
}

const readStoredTickets = () => {
  try {
    const storedTickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(storedTickets) ? storedTickets : []
  } catch {
    return []
  }
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [tickets, setTickets] = useState(readStoredTickets)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
  }, [tickets])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Please enter a ticket title.'
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Please enter a description.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const ticket = {
      id: `TKT-${Date.now().toString().slice(-6)}`,
      title: form.title.trim(),
      description: form.description.trim(),
      status: 'Open',
      createdAt: new Date().toISOString(),
    }

    setTickets((current) => [ticket, ...current])
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <main className="page-shell">
      <div className="content-wrap">
        <section className="ticket-card" aria-labelledby="ticket-form-title">
          <header className="ticket-header">
            <div className="ticket-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M7 3h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-2 6h14v7a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V9Z" />
              </svg>
            </div>
            <div>
              <p className="eyebrow">Employee portal</p>
              <h1 id="ticket-form-title">Create a support ticket</h1>
              <p className="intro">
                Tell us what you need help with. Your ticket will be submitted for review.
              </p>
            </div>
          </header>

          <form className="ticket-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="title">Ticket title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Unable to access my account"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
                maxLength="100"
              />
              {errors.title && (
                <p className="field-error" id="title-error" role="alert">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="description">Description</label>
                <span>{form.description.length}/500</span>
              </div>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the issue, what happened, and any steps you took..."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? 'description-error' : undefined}
                maxLength="500"
                rows="7"
              />
              {errors.description && (
                <p className="field-error" id="description-error" role="alert">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button className="submit-button" type="submit">
                Submit ticket
                <span aria-hidden="true">→</span>
              </button>
              <p className="form-note">Fields marked with information are required.</p>
            </div>

            {submitted && (
              <div className="success-message" role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Ticket submitted</strong>
                  <p>Your ticket has been received for support review.</p>
                </div>
              </div>
            )}
          </form>
        </section>

        <section className="tickets-section" aria-labelledby="tickets-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your activity</p>
              <h2 id="tickets-title">Submitted tickets</h2>
            </div>
            <span className="ticket-count">{tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}</span>
          </div>

          {tickets.length === 0 ? (
            <div className="empty-state">
              <span aria-hidden="true">✦</span>
              <h3>No tickets yet</h3>
              <p>Submit your first ticket using the form above.</p>
            </div>
          ) : (
            <div className="ticket-list">
              {tickets.map((ticket) => (
                <article className="ticket-item" key={ticket.id}>
                  <div className="ticket-item-main">
                    <div className="ticket-meta">
                      <span className="ticket-id">{ticket.id}</span>
                      <span className="status-badge">{ticket.status}</span>
                    </div>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.description}</p>
                    <time dateTime={ticket.createdAt}>
                      {new Intl.DateTimeFormat('en', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(new Date(ticket.createdAt))}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
