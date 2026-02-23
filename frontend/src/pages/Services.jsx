import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Services() {
  useEffect(() => {
    document.title = 'Our Services - S3N Technologies'

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

    document.querySelectorAll('.service-card, .process-step').forEach(el => {
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
          <h1>Our AI Services</h1>
          <p>Practical AI and digital solutions built and delivered by the founder — from initial consultation through to production deployment.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-brain"></i></div>
              <h3>Machine Learning Solutions</h3>
              <p>Advanced ML algorithms and models that learn from your data to provide predictive insights, automate decision-making, and optimize business processes.</p>
              <ul className="service-features">
                <li>Predictive Analytics</li>
                <li>Classification &amp; Regression Models</li>
                <li>Deep Learning Implementation</li>
                <li>Model Training &amp; Optimization</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fas fa-robot"></i></div>
              <h3>AI Automation</h3>
              <p>Intelligent process automation that reduces manual work, eliminates errors, and significantly improves operational efficiency across your organization.</p>
              <ul className="service-features">
                <li>Workflow Automation</li>
                <li>Robotic Process Automation</li>
                <li>Smart Document Processing</li>
                <li>Business Process Optimization</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Data Analytics &amp; Visualization</h3>
              <p>Transform raw data into actionable insights with advanced analytics, interactive dashboards, and comprehensive reporting solutions.</p>
              <ul className="service-features">
                <li>Business Intelligence Dashboards</li>
                <li>Real-time Analytics</li>
                <li>Statistical Analysis</li>
                <li>Custom Reporting Solutions</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fas fa-comments"></i></div>
              <h3>Natural Language Processing</h3>
              <p>Harness the power of language AI for chatbots, sentiment analysis, document processing, and intelligent text understanding.</p>
              <ul className="service-features">
                <li>Intelligent Chatbots</li>
                <li>Sentiment Analysis</li>
                <li>Text Classification</li>
                <li>Language Translation</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fas fa-eye"></i></div>
              <h3>Computer Vision</h3>
              <p>Advanced image and video analysis solutions for quality control, security monitoring, medical imaging, and visual inspection systems.</p>
              <ul className="service-features">
                <li>Image Recognition</li>
                <li>Object Detection</li>
                <li>Facial Recognition</li>
                <li>Quality Inspection Systems</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fas fa-cogs"></i></div>
              <h3>AI Consulting &amp; Strategy</h3>
              <p>Expert consultation to develop comprehensive AI strategies, assess readiness, and create roadmaps for successful AI implementation.</p>
              <ul className="service-features">
                <li>AI Readiness Assessment</li>
                <li>Strategy Development</li>
                <li>Technology Roadmapping</li>
                <li>ROI Analysis</li>
              </ul>
              <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>Get Started</Link>
            </div>
          </div>

          <section className="process-section">
            <h2>Our Implementation Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Discovery &amp; Analysis</h4>
                <p>We analyze your business needs, data infrastructure, and identify AI opportunities.</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>Strategy &amp; Planning</h4>
                <p>Develop a comprehensive AI strategy with clear milestones and success metrics.</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>Development &amp; Testing</h4>
                <p>Build and rigorously test AI models and solutions tailored to your requirements.</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h4>Deployment &amp; Integration</h4>
                <p>Seamlessly integrate AI solutions into your existing systems and workflows.</p>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <h4>Optimization &amp; Support</h4>
                <p>Continuous monitoring, optimization, and ongoing support to ensure peak performance.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to Start Your AI Journey?</h2>
              <p>Schedule a free consultation to discuss how our AI solutions can transform your business.</p>
              <Link to="/contact" className="btn btn-primary btn-large">Get Free Consultation</Link>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Services
