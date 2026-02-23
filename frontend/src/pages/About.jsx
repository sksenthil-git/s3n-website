import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  useEffect(() => {
    document.title = 'About Us - S3N Technologies'

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

    document.querySelectorAll('.value-card, .team-member, .achievement-item').forEach(el => {
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
          <h1>About S3N Technologies</h1>
          <p>Pioneering the future of artificial intelligence with innovative solutions that transform businesses worldwide.</p>
         </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="about-content">

            {/* Our Story */}
             {/* ── What We Do ── */}
            <section className="what-we-do">
            <div className="container">
                <h2 className="section-title">Who We Are</h2>
                <p className="section-subtitle">
                A young and ambitious startup driven by tech-savvy innovators passionate about building intelligent solutions for real business problems.
                </p>
                </div>
                </section>

            {/* Mission / Vision */}
            <section className="mission-vision">
              <div className="mission-vision-grid">
                <div className="mission-card">
                  <div className="mission-icon"><i className="fas fa-rocket"></i></div>
                  <h3>Our Mission</h3>
                  <p>To help businesses of every size solve real problems with practical, well-built digital and AI solutions — without unnecessary complexity or cost.</p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon"><i className="fas fa-eye"></i></div>
                  <h3>Our Vision</h3>
                  <p>To be the trusted technology partner businesses return to — built on consistent delivery, honest communication, and long-term relationships.</p>
                </div>
              </div>
            </section>

      {/* ── What We Do ── */}
      <section className="what-we-do">
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            We apply cutting-edge AI and data technologies to turn complex business problems into scalable, production-ready solutions.
          </p>
          <div className="capability-grid">
            <div className="capability-card">
              <div className="capability-icon"><i className="fas fa-brain"></i></div>
              <h4>Machine Learning</h4>
              <p>Predictive models and adaptive algorithms trained on your data.</p>
            </div>
            <div className="capability-card">
              <div className="capability-icon"><i className="fas fa-network-wired"></i></div>
              <h4>Deep Learning</h4>
              <p>Neural networks for complex pattern recognition and inference.</p>
            </div>
            <div className="capability-card">
              <div className="capability-icon"><i className="fas fa-comments"></i></div>
              <h4>Natural Language Processing</h4>
              <p>Chatbots, document intelligence, and language understanding.</p>
            </div>
            <div className="capability-card">
              <div className="capability-icon"><i className="fas fa-chart-line"></i></div>
              <h4>Data Analytics</h4>
              <p>Dashboards, reporting, and visual insights from raw data.</p>
            </div>
            <div className="capability-card">
              <div className="capability-icon"><i className="fas fa-robot"></i></div>
              <h4>AI Automation</h4>
              <p>Process automation that reduces manual effort and errors.</p>
            </div>
          </div>
      </section>

            {/* Core Values */}
            <section className="values-section">
              <h2>Our Core Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
                  <h4>Innovation</h4>
                  <p>We stay current with modern AI and cloud technologies, applying what's proven and practical — not what's fashionable.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-shield-alt"></i></div>
                  <h4>Integrity</h4>
                  <p>Honest timelines, honest pricing, honest communication — even when the news isn't what you hoped to hear.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-users"></i></div>
                  <h4>Collaboration</h4>
                  <p>We treat every client as a partner. Understanding your goals deeply is what separates a good solution from the right one.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-award"></i></div>
                  <h4>Excellence</h4>
                  <p>We'd rather do fewer projects and do them exceptionally well than spread thin and deliver mediocrity.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-globe"></i></div>
                  <h4>Sustainability</h4>
                  <p>We build solutions designed to last — maintainable, documented, and free of unnecessary vendor dependencies.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-handshake"></i></div>
                  <h4>Trust</h4>
                  <p>Accountability doesn't end at go-live. We remain involved, responsive, and invested in your long-term success.</p>
                </div>
              </div>
            </section>

            {/* Who You Work With */}
            {/* <section className="team-section">
              <h2>Who You Work With</h2>
              <div className="team-grid" style={{ maxWidth: '480px' }}>
                <div className="team-member">
                  <div className="member-avatar"><i className="fas fa-user"></i></div>
                  <div className="member-info">
                    <p className="member-title">Founder &amp; Principal Consultant</p>
                    <p className="member-description">15+ years in software engineering, cloud architecture, and AI delivery. I lead every engagement personally — from scoping and design through to deployment and post-launch support. No account managers, no hand-offs.</p>
                    <div className="member-links">
                      <a href="https://www.linkedin.com/in/sksenthil" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                      <a href="mailto:sk.senthil@gmail.com"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="specialist-note">
                <i className="fas fa-network-wired"></i>
                <p>When projects require specialist expertise — UI/UX design, data engineering, mobile development — we bring in trusted partners from our network of experienced professionals. You always know who's working on your project.</p>
              </div>
            </section> */}

            {/* How We Deliver */}
            <section className="achievements-section">
              <h2>How We Deliver</h2>
              <div className="achievements-grid">
                {/* <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-user-tie"></i></div>
                  <h4>Direct Founder Engagement</h4>
                  <p>Every project is personally led by the founder. You get senior-level thinking and hands-on delivery from day one — not a junior team managed from a distance.</p>
                </div> */}
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-comments"></i></div>
                  <h4>Transparent Communication</h4>
                  <p>Regular updates, honest timelines, and direct access. You'll always know where your project stands and what's coming next.</p>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-unlock-alt"></i></div>
                  <h4>No Vendor Lock-In</h4>
                  <p>We build with open standards and document everything clearly. You own your code, your data, and your infrastructure — fully and permanently.</p>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-seedling"></i></div>
                  <h4>Long-Term Accountability</h4>
                  <p>We stay involved post-launch. Monitoring, adjustments, and improvements are part of how we work — not an upsell.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
              <div className="cta-content">
                <h2>Ready to Work Together?</h2>
                <p>Every project starts with a conversation. Let's discuss your challenges, your goals, and how we can help.</p>
                <Link to="/contact" className="btn btn-primary btn-large">Get in Touch</Link>
              </div>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
