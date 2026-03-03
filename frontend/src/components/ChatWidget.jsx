import { useState } from 'react'
import { submitContactForm } from '../services/api'

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const data = await submitContactForm(form)
      if (data.success) {
        setStatus('success')
        setTimeout(() => {
          setStatus(null)
          setForm({ name: '', email: '', message: '' })
          setOpen(false)
        }, 3000)
      } else {
        // console.warn('[ChatWidget] API returned success=false:', data.message)
        setStatus('error')
      }
    } catch (err) {
      // console.error('[ChatWidget] Fetch error:', err)
      setStatus('error')
    }
  }

  const toggle = () => {
    setOpen((prev) => !prev)
    if (open) {
      setStatus(null)
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="chat-panel-title">
              <div className="chat-avatar">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h4>Chat with S3N</h4>
                <p>We typically reply within a few hours</p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggle} aria-label="Close chat">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {status === 'success' ? (
            <div className="chat-success">
              <i className="fas fa-check-circle"></i>
              <h4>Message sent!</h4>
              <p>Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <div className="chat-body">
              <form onSubmit={handleSubmit}>
                <div className="chat-form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="chat-form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                  />
                </div>
                <div className="chat-form-group">
                  <textarea
                    name="message"
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                  />
                </div>
                {status === 'error' && (
                  <p className="chat-error">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  className="btn btn-solid chat-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <button
        className={`chat-bubble ${open ? 'chat-bubble--open' : ''}`}
        onClick={toggle}
        aria-label="Chat with us"
      >
        <i className={`fas ${open ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  )
}

export default ChatWidget
