
import { Bus, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <Bus style={{ width: '2rem', height: '2rem', color: '#ff6b35' }} />
              <span className="footer-logo-text">BusVoyager</span>
            </div>
            <p className="footer-description">
              Your trusted partner for comfortable and affordable bus travel across India. 
              Making every journey memorable since 2020.
            </p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Phone />
                <span>+91 98765 43210</span>
              </div>
              <div className="footer-contact-item">
                <Mail />
                <span>support@busvoyager.com</span>
              </div>
              <div className="footer-contact-item">
                <MapPin />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {['Home', 'About Us', 'Routes', 'Book Tickets', 'Track Bus', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="footer-section">
            <h3>Popular Routes</h3>
            <ul className="footer-links">
              {[
                'Delhi to Mumbai',
                'Bangalore to Chennai',
                'Pune to Goa',
                'Hyderabad to Tirupati',
                'Jaipur to Udaipur',
                'Kolkata to Darjeeling'
              ].map((route) => (
                <li key={route}>
                  <a href="#">{route}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              {[
                'Help Center',
                'Terms & Conditions',
                'Privacy Policy',
                'Refund Policy',
                'Cancellation Policy',
                'Customer Care'
              ].map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 BusVoyager. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
