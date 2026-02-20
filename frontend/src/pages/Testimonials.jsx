import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Testimonials() {
  useEffect(() => {
    document.title = 'Client Testimonials - S3N Technologies'

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

    document.querySelectorAll('.testimonial-card, .case-study').forEach(el => {
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
          <h1>What Our Clients Say</h1>
          <p>Discover how S3N Technologies has transformed businesses across various industries with cutting-edge AI solutions.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="testimonials-intro">
            <h2>Trusted by Industry Leaders</h2>
            <p>Our AI solutions have delivered measurable results for companies of all sizes. Here's what our clients have to say about their experience working with S3N Technologies.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card featured">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "S3N Technologies completely transformed our customer service operations. Their AI-powered chatbot reduced response times by 85% and increased customer satisfaction scores by 40%. The implementation was seamless, and their team provided exceptional support throughout the entire process."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <h4>Sarah Mitchell</h4>
                  <p>Chief Technology Officer</p>
                  <p className="company">TechFlow Solutions</p>
                </div>
              </div>
              <div className="testimonial-results">
                <div className="result-item">
                  <span className="result-number">85%</span>
                  <span className="result-label">Faster Response Times</span>
                </div>
                <div className="result-item">
                  <span className="result-number">40%</span>
                  <span className="result-label">Higher Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "The predictive analytics solution from S3N has revolutionized our inventory management. We've reduced waste by 60% and improved our demand forecasting accuracy significantly. The ROI was evident within the first quarter."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">DR</div>
                <div className="author-info">
                  <h4>David Rodriguez</h4>
                  <p>Operations Director</p>
                  <p className="company">Global Retail Corp</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "Working with S3N was a game-changer for our manufacturing process. Their computer vision system for quality control has eliminated defects and saved us millions in potential recalls. Exceptional expertise and professionalism."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">LT</div>
                <div className="author-info">
                  <h4>Lisa Thompson</h4>
                  <p>Quality Assurance Manager</p>
                  <p className="company">Precision Manufacturing Inc.</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "S3N's natural language processing solution has automated 70% of our document processing workflow. What used to take days now happens in minutes. Their team understood our complex requirements and delivered beyond expectations."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <h4>Michael Johnson</h4>
                  <p>IT Director</p>
                  <p className="company">Legal Associates Group</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "The AI consulting strategy session with S3N helped us identify key opportunities we hadn't considered. Their roadmap has guided our digital transformation journey, resulting in significant competitive advantages."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AR</div>
                <div className="author-info">
                  <h4>Amanda Roberts</h4>
                  <p>Chief Executive Officer</p>
                  <p className="company">Innovation Dynamics</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="testimonial-text">
                "The machine learning models developed by S3N have improved our fraud detection capabilities by 95%. Their expertise in financial AI applications is unmatched, and the results speak for themselves."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">CW</div>
                <div className="author-info">
                  <h4>Charles Williams</h4>
                  <p>Risk Management Director</p>
                  <p className="company">SecureBank Financial</p>
                </div>
              </div>
            </div>
          </div>

          <section className="case-studies">
            <h2>Success Stories</h2>
            <div className="case-studies-grid">
              <div className="case-study">
                <div className="case-study-header">
                  <h3>E-commerce Personalization Engine</h3>
                  <span className="case-study-industry">Retail</span>
                </div>
                <div className="case-study-content">
                  <p>Implemented an AI-driven recommendation system that increased conversion rates by 35% and average order value by 28% for a major e-commerce platform.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">35%</span>
                      <span className="metric-label">Conversion Increase</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">28%</span>
                      <span className="metric-label">Higher Order Value</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">3 months</span>
                      <span className="metric-label">Implementation Time</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-study">
                <div className="case-study-header">
                  <h3>Predictive Maintenance System</h3>
                  <span className="case-study-industry">Manufacturing</span>
                </div>
                <div className="case-study-content">
                  <p>Developed an IoT and AI-powered predictive maintenance solution that reduced unplanned downtime by 80% and maintenance costs by 45%.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">80%</span>
                      <span className="metric-label">Downtime Reduction</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">45%</span>
                      <span className="metric-label">Cost Savings</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">$2M</span>
                      <span className="metric-label">Annual Savings</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-study">
                <div className="case-study-header">
                  <h3>Medical Image Analysis</h3>
                  <span className="case-study-industry">Healthcare</span>
                </div>
                <div className="case-study-content">
                  <p>Created a computer vision system for medical imaging that improved diagnostic accuracy by 92% and reduced analysis time from hours to minutes.</p>
                  <div className="case-study-metrics">
                    <div className="metric">
                      <span className="metric-value">92%</span>
                      <span className="metric-label">Accuracy Improvement</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">90%</span>
                      <span className="metric-label">Time Reduction</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">10,000+</span>
                      <span className="metric-label">Images Processed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="client-logos">
            <h2>Trusted by Leading Companies</h2>
            <div className="logos-grid">
              <div className="logo-placeholder">TechFlow Solutions</div>
              <div className="logo-placeholder">Global Retail Corp</div>
              <div className="logo-placeholder">Precision Manufacturing</div>
              <div className="logo-placeholder">Legal Associates</div>
              <div className="logo-placeholder">Innovation Dynamics</div>
              <div className="logo-placeholder">SecureBank Financial</div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to Join Our Success Stories?</h2>
              <p>Let's discuss how S3N Technologies can transform your business and deliver measurable results.</p>
              <Link to="/contact" className="btn btn-primary btn-large">Start Your Success Story</Link>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Testimonials
