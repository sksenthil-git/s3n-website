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

    // Page fade in
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

    // Parallax
    const handleParallax = () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector('.hero')
      const floatingElements = document.querySelectorAll('.floating-element')
      if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`
        floatingElements.forEach((el, i) => {
          const speed = 0.2 + i * 0.1
          el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
        })
      }
    }
    window.addEventListener('scroll', handleParallax)

    // Fade-in + counter animations
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

    document.querySelectorAll('.feature-card, .stats').forEach(el => {
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
              Cutting-edge AI solutions that revolutionize business operations and decision-making.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-brain">
              <div className="brain-node"></div>
              <div className="brain-node"></div>
              <div className="brain-node"></div>
              <div className="brain-node"></div>
              <div className="brain-connection"></div>
              <div className="brain-connection"></div>
              <div className="brain-connection"></div>
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Our AI Solutions</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-brain"></i></div>
              <h3>Machine Learning</h3>
              <p>Advanced ML algorithms that learn and adapt to your business needs, providing intelligent automation and predictive insights.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-robot"></i></div>
              <h3>AI Automation</h3>
              <p>Streamline your workflows with intelligent automation solutions that reduce costs and improve efficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Data Analytics</h3>
              <p>Transform raw data into actionable insights with our advanced AI-powered analytics and visualization tools.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-comments"></i></div>
              <h3>NLP Solutions</h3>
              <p>Natural Language Processing solutions for chatbots, sentiment analysis, and intelligent document processing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-target="500">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="150">0</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="99">0</div>
              <div className="stat-label">% Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="24">0</div>
              <div className="stat-label">7 Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join hundreds of companies already using our AI solutions to gain competitive advantage.</p>
            <Link to="/contact" className="btn btn-primary btn-large">Start Your AI Journey</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
