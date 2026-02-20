import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '',
    phone: '', service: '', budget: '', timeline: '', message: '', newsletter: false,
  })
  const [formMessage, setFormMessage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us - S3N Technologies'
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease-in-out'
    setTimeout(() => { document.body.style.opacity = '1' }, 100)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setFormMessage({ type: 'error', text: 'Please fill in all required fields.' })
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
      const res = await fetch('/api/contact', {
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
      setFormMessage({ type: 'error', text: 'Failed to send message. Please try again.' })
    } finally {
      setSubmitting(false)
      setTimeout(() => setFormMessage(null), 5000)
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
          <h1>Get In Touch</h1>
          <p>Ready to transform your business with AI? Let's discuss how we can help you achieve your goals.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Let's Start a Conversation</h2>
              <p>Whether you're looking to implement AI solutions, need consultation, or have questions about our services, we're here to help. Reach out to our team of experts.</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-details">
                    <h4>Email Us</h4>
                    <p>sk.senthil@gmail.com</p>
                    <span>We typically respond within 24 hours</span>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-phone"></i></div>
                  <div className="contact-details">
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                    <span>Mon-Fri 9AM-6PM EST</span>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="contact-details">
                    <h4>Visit Us</h4>
                    <p>Technology Hub<br />Innovation District</p>
                    <span>By appointment only</span>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon"><i className="fas fa-calendar"></i></div>
                  <div className="contact-details">
                    <h4>Schedule a Meeting</h4>
                    <p>Free 30-minute consultation</p>
                    <span>Available Monday through Friday</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                {formMessage && <div style={msgStyle(formMessage.type)}>{formMessage.text}</div>}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interest</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Select a service</option>
                    <option value="machine-learning">Machine Learning Solutions</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="data-analytics">Data Analytics &amp; Visualization</option>
                    <option value="nlp">Natural Language Processing</option>
                    <option value="computer-vision">Computer Vision</option>
                    <option value="consulting">AI Consulting &amp; Strategy</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Project Budget</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                    <option value="enterprise">Enterprise Level</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Project Timeline</label>
                  <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}>
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="planning">Just planning</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, goals, and how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Subscribe to our newsletter for AI insights and updates
                  </label>
                </div>

                <button type="submit" className="btn btn-solid btn-large" disabled={submitting}>
                  <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>How long does an AI implementation typically take?</h4>
                <p>Project timelines vary based on complexity, but most implementations range from 3-8 months. We provide detailed timelines during our initial consultation.</p>
              </div>
              <div className="faq-item">
                <h4>Do you provide ongoing support after implementation?</h4>
                <p>Yes, we offer comprehensive support packages including monitoring, optimization, and updates to ensure your AI solutions continue performing at their best.</p>
              </div>
              <div className="faq-item">
                <h4>What industries do you work with?</h4>
                <p>We work across various industries including healthcare, finance, manufacturing, retail, and technology. Our solutions are customized for each sector's specific needs.</p>
              </div>
              <div className="faq-item">
                <h4>How do you ensure data security and privacy?</h4>
                <p>We follow strict security protocols and compliance standards. All data is encrypted, and we can work within your existing security frameworks and requirements.</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Contact
