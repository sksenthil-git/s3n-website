import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  const countersRun = { current: false }

  useEffect(() => {
    document.title = 'About Us - S3N Technologies'

    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease-in-out'
    setTimeout(() => { document.body.style.opacity = '1' }, 100)

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
          if (entry.target.classList.contains('company-stats') && !countersRun.current) {
            countersRun.current = true
            animateCounters()
          }
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.value-card, .team-member, .achievement-item, .company-stats').forEach(el => {
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
            <div className="about-intro">
              <div className="about-text">
                <h2>Our Story</h2>
                <p>Founded in 2020, S3N Technologies emerged from a vision to democratize artificial intelligence and make it accessible to businesses of all sizes. What began as a small team of passionate AI researchers and engineers has grown into a leading AI solutions provider, serving clients across diverse industries worldwide.</p>
                <p>Our name, S3N (pronounced "Seen"), represents our core mission: to help businesses <strong>See</strong> new possibilities, <strong>Scale</strong> their operations intelligently, and <strong>Succeed</strong> in the digital age through the power of artificial intelligence.</p>
                <p>With over 500 successful projects completed and a 99% client satisfaction rate, we've established ourselves as a trusted partner for organizations looking to harness the transformative power of AI.</p>
              </div>
              <div className="about-visual">
                <div className="about-image-placeholder">
                  <i className="fas fa-building"></i>
                  <span>S3N Headquarters</span>
                </div>
              </div>
            </div>

            <section className="mission-vision">
              <div className="mission-vision-grid">
                <div className="mission-card">
                  <div className="mission-icon"><i className="fas fa-rocket"></i></div>
                  <h3>Our Mission</h3>
                  <p>To empower businesses with cutting-edge AI solutions that drive innovation, efficiency, and sustainable growth while maintaining the highest standards of ethics and security.</p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon"><i className="fas fa-eye"></i></div>
                  <h3>Our Vision</h3>
                  <p>To be the global leader in AI transformation, creating a future where intelligent technology seamlessly enhances human potential and business success.</p>
                </div>
              </div>
            </section>

            <section className="values-section">
              <h2>Our Core Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
                  <h4>Innovation</h4>
                  <p>We continuously push the boundaries of what's possible, staying at the forefront of AI research and development to deliver cutting-edge solutions.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-shield-alt"></i></div>
                  <h4>Integrity</h4>
                  <p>We maintain the highest ethical standards in all our AI implementations, ensuring transparency, fairness, and responsible AI practices.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-users"></i></div>
                  <h4>Collaboration</h4>
                  <p>We work closely with our clients as true partners, understanding their unique challenges and goals to deliver tailored solutions.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-award"></i></div>
                  <h4>Excellence</h4>
                  <p>We strive for perfection in every project, delivering solutions that not only meet but exceed our clients' expectations.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-globe"></i></div>
                  <h4>Sustainability</h4>
                  <p>We develop AI solutions that contribute to a sustainable future, optimizing resource usage and promoting environmental responsibility.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon"><i className="fas fa-handshake"></i></div>
                  <h4>Trust</h4>
                  <p>We build lasting relationships based on trust, reliability, and consistent delivery of high-quality AI solutions.</p>
                </div>
              </div>
            </section>

            <section className="team-section">
              <h2>Meet Our Leadership Team</h2>
              <div className="team-grid">
                <div className="team-member">
                  <div className="member-avatar">SK</div>
                  <div className="member-info">
                    <h4>SK Senthil</h4>
                    <p className="member-title">Founder &amp; CEO</p>
                    <p className="member-description">Visionary leader with 15+ years in AI and machine learning. Former senior researcher at leading tech companies, passionate about democratizing AI for businesses.</p>
                    <div className="member-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="mailto:sk.senthil@gmail.com"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">DR</div>
                  <div className="member-info">
                    <h4>Dr. Rachel Chen</h4>
                    <p className="member-title">Chief Technology Officer</p>
                    <p className="member-description">PhD in Computer Science with expertise in deep learning and neural networks. Published researcher with 50+ peer-reviewed papers in AI journals.</p>
                    <div className="member-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">MP</div>
                  <div className="member-info">
                    <h4>Marcus Peterson</h4>
                    <p className="member-title">Head of Data Science</p>
                    <p className="member-description">Expert in statistical modeling and predictive analytics. Former lead data scientist at Fortune 500 companies, specializing in business intelligence solutions.</p>
                    <div className="member-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">AS</div>
                  <div className="member-info">
                    <h4>Aisha Sharma</h4>
                    <p className="member-title">Director of Client Solutions</p>
                    <p className="member-description">Business strategist with deep understanding of AI implementation across industries. Focused on ensuring client success and maximum ROI from AI investments.</p>
                    <div className="member-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="achievements-section">
              <h2>Our Achievements</h2>
              <div className="achievements-grid">
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-trophy"></i></div>
                  <h4>AI Innovation Award 2024</h4>
                  <p>Recognized as the most innovative AI company by the Global Technology Council for our breakthrough computer vision solutions.</p>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-medal"></i></div>
                  <h4>Best AI Implementation</h4>
                  <p>Won the Industry Excellence Award for our predictive maintenance solution that saved a manufacturing client $2M annually.</p>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-star"></i></div>
                  <h4>Top AI Consulting Firm</h4>
                  <p>Ranked among the top 10 AI consulting firms globally by Business Intelligence Magazine for three consecutive years.</p>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon"><i className="fas fa-graduation-cap"></i></div>
                  <h4>Research Partnerships</h4>
                  <p>Collaborative research partnerships with leading universities, contributing to advancement in AI ethics and responsible AI development.</p>
                </div>
              </div>
            </section>

            <section className="company-stats">
              <h2>By the Numbers</h2>
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
                  <div className="stat-number" data-target="25">0</div>
                  <div className="stat-label">Industries Served</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-target="50">0</div>
                  <div className="stat-label">AI Experts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-target="99">0</div>
                  <div className="stat-label">% Client Satisfaction</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-target="24">0</div>
                  <div className="stat-label">7 Support</div>
                </div>
              </div>
            </section>

            <section className="cta-section">
              <div className="cta-content">
                <h2>Ready to Transform Your Business?</h2>
                <p>Join the hundreds of companies that trust S3N Technologies to deliver innovative AI solutions that drive real business results.</p>
                <Link to="/contact" className="btn btn-primary btn-large">Start Your AI Journey</Link>
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
