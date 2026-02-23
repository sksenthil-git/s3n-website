import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">S3N</span>
              <span className="logo-subtitle">Technologies</span>
            </div>
            <p>Leading the future of artificial intelligence with innovative solutions that transform businesses worldwide.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Working Hours</h4>
            <ul>
              <li><i className="fas fa-clock"></i> Mon – Fri: 9am – 6pm</li>
              <li><i className="fas fa-reply"></i> Responses within 24 hours</li>
              <li><i className="fas fa-map-marker-alt"></i> HQ: Coimbatore, Tamil Nadu</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/data-deletion">Data Deletion Request</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 S3N Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
