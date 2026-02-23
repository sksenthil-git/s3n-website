import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Testimonials() {
  useEffect(() => {
    document.title = 'Our Work - S3N Technologies'

    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease-in-out'
    setTimeout(() => { document.body.style.opacity = '1' }, 100)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.case-study').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'all 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      <section className="page-header">
        <div className="container">
          <h1>Our Work</h1>
          <p>Examples of the problems we solve and the solutions we build — across industries and technology stacks.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">

          <div className="testimonials-intro">
            <h2>Real Work, Real Results</h2>
            <p>We're a founder-led consultancy that lets the work speak for itself. Below are representative examples of the types of problems we tackle — reflecting genuine capabilities, not marketing copy.</p>
          </div>

          {/* Example Engagements */}
          <section className="case-studies">
            <h2>Example Engagements</h2>
            <div className="case-studies-grid">

              <div className="case-study">
                <div className="case-study-header">
                  <h3>AI Recommendation Engine</h3>
                  <span className="case-study-industry">Retail</span>
                </div>
                <div className="case-study-content">
                  <p>We design and build AI-powered recommendation systems that personalise product discovery, increase conversions, and grow average order value for e-commerce and content platforms.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">ML</span>
                      <span className="metric-label">Collaborative Filtering</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">API</span>
                      <span className="metric-label">Real-Time Delivery</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">A/B</span>
                      <span className="metric-label">Testing &amp; Tuning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-study">
                <div className="case-study-header">
                  <h3>Predictive Maintenance</h3>
                  <span className="case-study-industry">Manufacturing</span>
                </div>
                <div className="case-study-content">
                  <p>We build IoT-integrated AI systems that monitor equipment health in real time, predicting failures before they happen — reducing unplanned downtime and maintenance costs.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">IoT</span>
                      <span className="metric-label">Sensor Integration</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">ML</span>
                      <span className="metric-label">Anomaly Detection</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">Live</span>
                      <span className="metric-label">Real-Time Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-study">
                <div className="case-study-header">
                  <h3>Document Processing Automation</h3>
                  <span className="case-study-industry">Operations</span>
                </div>
                <div className="case-study-content">
                  <p>We automate document-heavy workflows using NLP — turning hours of manual data extraction, classification, and routing into a reliable, auditable automated pipeline.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">NLP</span>
                      <span className="metric-label">Text Extraction</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">OCR</span>
                      <span className="metric-label">Document Parsing</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">API</span>
                      <span className="metric-label">System Integration</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Honest testimonials placeholder */}
          <section className="testimonial-coming-soon">
            <div className="coming-soon-card">
              <div className="coming-soon-icon"><i className="fas fa-quote-left"></i></div>
              <h3>Client Testimonials Coming Soon</h3>
              <p>We believe in letting real results speak. As our client base grows, this page will feature genuine feedback from the businesses we've partnered with.</p>
              <p>In the meantime, reach out directly — we're happy to discuss our approach, share relevant experience, and answer any questions you have about how we work.</p>
              <Link to="/contact" className="btn btn-solid" style={{ marginTop: '20px', display: 'inline-block' }}>Start a Conversation</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Have a Project in Mind?</h2>
              <p>Let's discuss your challenges and build a practical solution together.</p>
              <Link to="/contact" className="btn btn-primary btn-large">Get in Touch</Link>
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default Testimonials
