import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const APPS = [
  { value: '', label: 'Select an app' },
  { value: 'Deal Search (deal-search.com)', label: 'Deal Search (deal-search.com)' },
  { value: 'Chit Collection App', label: 'Chit Collection App' },
  { value: 'Rent Collection App', label: 'Rent Collection App' },
]

function DataDeletion() {
  const [formData, setFormData] = useState({ email: '', app: '' })
  const [formMessage, setFormMessage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Data Deletion Request - S3N Technologies'
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease-in-out'
    setTimeout(() => { document.body.style.opacity = '1' }, 100)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.app) {
      setFormMessage({ type: 'error', text: 'Please provide your email address and select an app.' })
      setTimeout(() => setFormMessage(null), 5000)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormMessage({ type: 'error', text: 'Please enter a valid email address.' })
      setTimeout(() => setFormMessage(null), 5000)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/data-deletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setFormMessage({
        type: data.success ? 'success' : 'error',
        text: data.message,
      })
    } catch {
      setFormMessage({ type: 'error', text: 'Failed to submit request. Please try again.' })
    } finally {
      setSubmitting(false)
      setTimeout(() => setFormMessage(null), 8000)
    }
  }

  const msgStyle = (type) => ({
    padding: '15px',
    margin: '20px 0',
    borderRadius: '8px',
    fontWeight: 500,
    textAlign: 'center',
    ...(type === 'success'
      ? { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
      : { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }),
  })

  return (
    <>
      <Navbar />

      <section className="page-header">
        <div className="container">
          <h1>Data Deletion Request</h1>
          <p>Submit a request to delete your account and personal data from any of our mobile applications.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>

            {/* Info panel */}
            <div>
              <h2>Your Right to Data Deletion</h2>
              <p style={{ marginBottom: '1.5rem', color: '#6b7280', lineHeight: 1.7 }}>
                We respect your privacy and your right to control your personal data. Upon receiving your request, we will permanently delete your account and all associated data from our systems within <strong>30 days</strong>.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-trash-alt"></i></div>
                  <div className="contact-details">
                    <h4>What Gets Deleted</h4>
                    <p>Your account, profile, and all personal data associated with the selected app.</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-clock"></i></div>
                  <div className="contact-details">
                    <h4>Processing Time</h4>
                    <p>Requests are processed within 30 days of submission.</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-details">
                    <h4>Confirmation</h4>
                    <p>You will receive an email confirmation once your data has been deleted.</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-undo-alt"></i></div>
                  <div className="contact-details">
                    <h4>Irreversible Action</h4>
                    <p>Deletion is permanent and cannot be undone. You will need to create a new account to use the app again.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form panel */}
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Submit Deletion Request</h3>

                {formMessage && <div style={msgStyle(formMessage.type)}>{formMessage.text}</div>}

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter the email linked to your account"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="app">Select App *</label>
                  <select
                    id="app"
                    name="app"
                    value={formData.app}
                    onChange={handleChange}
                    required
                  >
                    {APPS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#92400e' }}>
                  <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                  This action is <strong>permanent and irreversible</strong>. All your data in the selected app will be permanently deleted.
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={submitting}>
                  <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-trash-alt'}`}></i>
                  {submitting ? 'Submitting...' : 'Submit Deletion Request'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>How long does deletion take?</h4>
                <p>We process all data deletion requests within 30 days of submission. You will receive an email confirmation once the deletion is complete.</p>
              </div>
              <div className="faq-item">
                <h4>What data will be deleted?</h4>
                <p>All personal data associated with your account including your profile, transaction history, preferences, and any other data stored in the app will be permanently removed.</p>
              </div>
              <div className="faq-item">
                <h4>Can I cancel my deletion request?</h4>
                <p>You may cancel your request by contacting us at sk.senthil@gmail.com before the deletion is processed. Once deleted, data cannot be recovered.</p>
              </div>
              <div className="faq-item">
                <h4>Do I need to delete each app separately?</h4>
                <p>Yes, each app maintains its own data. Please submit a separate request for each app you wish to remove your data from.</p>
              </div>
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default DataDeletion
