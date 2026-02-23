import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  const fullTitle = 'Transforming Business with Advanced AI'
  const [displayedTitle, setDisplayedTitle] = useState('')
  const countersRun = { current: false }

  useEffect(() => {
    document.title = 'S3N Technologies - Leading AI Solutions'

    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease-in-out'
    setTimeout(() => { document.body.style.opacity = '1' }, 100)

    // Typing effect
    let index = 0
    const typingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullTitle.length) {
          setDisplayedTitle(fullTitle.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 50)
    }, 500)

    // Parallax — only move the background layer, not the hero container
    const handleParallax = () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector('.hero')
      const heroBg = document.querySelector('.hero-background')
      const floatingElements = document.querySelectorAll('.floating-element')
      if (hero && scrolled < hero.offsetHeight) {
        if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.4}px)`
        floatingElements.forEach((el, i) => {
          const speed = 0.1 + i * 0.05
          el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`
        })
      }
    }
    window.addEventListener('scroll', handleParallax)

    // Counter animation
    const animateCounters = () => {
      document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'))
        const increment = target / 100
        let current = 0
        const update = () => {
          if (current < target) {
            current += increment
            counter.textContent = Math.floor(current)
            setTimeout(update, 20)
          } else {
            counter.textContent = target
          }
        }
        update()
      })
    }

    // Scroll-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          if (entry.target.classList.contains('stats') && !countersRun.current) {
            countersRun.current = true
            animateCounters()
          }
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.stats, .process-step, .industry-card, .why-card, .capability-card').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'all 0.6s ease'
      observer.observe(el)
    })

    return () => {
      clearTimeout(typingTimer)
      window.removeEventListener('scroll', handleParallax)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{displayedTitle || '\u00A0'}</h1>
            <p className="hero-subtitle">
              We design, build, and scale practical AI and digital solutions for businesses of every size.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-cards">
            <div className="hero-card">
              <div className="hero-card-icon"><i className="fas fa-brain"></i></div>
              <h3>Machine Learning</h3>
              <p>Advanced ML algorithms that learn and adapt to your business needs with predictive insights.</p>
            </div>
            <div className="hero-card">
              <div className="hero-card-icon"><i className="fas fa-robot"></i></div>
              <h3>AI Automation</h3>
              <p>Streamline workflows with intelligent automation that reduces costs and improves efficiency.</p>
            </div>
            <div className="hero-card">
              <div className="hero-card-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Data Analytics</h3>
              <p>Transform raw data into actionable insights with AI-powered analytics and visualisation.</p>
            </div>
            <div className="hero-card">
              <div className="hero-card-icon"><i className="fas fa-comments"></i></div>
              <h3>NLP Solutions</h3>
              <p>Chatbots, sentiment analysis, and intelligent document processing powered by NLP.</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── How We Work ── */}
      <section className="home-process">
        <div className="container">
          <h2 className="section-title">How We Work</h2>
          <p className="section-subtitle">
            Our proven four-step approach delivers measurable results, from initial discovery through to live deployment.
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Discover</h4>
              <p>We analyse your business challenges and data landscape to identify the highest-impact AI opportunities.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Design</h4>
              <p>Our engineers architect tailored ML models and pipelines aligned to your goals and infrastructure.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Deploy</h4>
              <p>We integrate solutions seamlessly into your existing workflows with minimal disruption to operations.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Optimise</h4>
              <p>Continuous monitoring and model retraining ensure your AI stays accurate and effective over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strengths ── */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-badge"><i className="fas fa-calendar-check"></i></div>
              <div className="stat-label">20+ Years Experience</div>
              <div className="stat-sub">Software &amp; cloud architecture</div>
            </div>
            <div className="stat-item">
              <div className="stat-badge"><i className="fas fa-unlock-alt"></i></div>
              <div className="stat-label">No Vendor Lock-In</div>
              <div className="stat-sub">Open standards, always</div>
            </div>
            <div className="stat-item">
              <div className="stat-badge"><i className="fas fa-comments"></i></div>
              <div className="stat-label">Direct Access</div>
              <div className="stat-sub">No hand-offs or middlemen</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="industries">
        <div className="container">
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-subtitle">
            From healthcare to logistics, our AI solutions drive innovation across diverse sectors.
          </p>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-heartbeat"></i></div>
              <h4>Healthcare</h4>
              <p>AI-driven diagnostics, patient risk prediction, and clinical workflow automation.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-chart-bar"></i></div>
              <h4>Finance</h4>
              <p>Fraud detection, algorithmic trading, credit scoring, and regulatory compliance.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-shopping-cart"></i></div>
              <h4>Retail</h4>
              <p>Demand forecasting, personalised recommendations, and inventory optimisation.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-cogs"></i></div>
              <h4>Manufacturing</h4>
              <p>Predictive maintenance, quality control, and smart supply chain management.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-graduation-cap"></i></div>
              <h4>Education</h4>
              <p>Adaptive learning platforms, student performance analytics, and content personalisation.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-truck"></i></div>
              <h4>Logistics</h4>
              <p>Route optimisation, shipment tracking, and automated warehouse operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose S3N? ── */}
      <section className="why-us">
        <div className="container">
          <h2 className="section-title">Why Choose S3N?</h2>
          <p className="section-subtitle">
            Smaller team, faster decisions, better accountability, and solutions built to last.
          </p>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-user-tie"></i></div>
              <h4>Direct Contacts</h4>
              <p>You work with direct contacts from day one to delivery. No account managers, no hand-offs, no lost context between meetings.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-unlock-alt"></i></div>
              <h4>No Vendor Lock-In</h4>
              <p>We build with open standards and hand over fully documented, maintainable code. You own everything — completely and permanently.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-seedling"></i></div>
              <h4>Long-Term Accountability</h4>
              <p>We stay involved after launch. Monitoring, tuning, and improvements are part of how we work — not an optional extra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss your challenges and build the right solution together.</p>
            <Link to="/contact" className="btn btn-primary btn-large">Start Your AI Journey</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
