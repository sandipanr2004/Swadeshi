import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiMail, FiHeart,FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Swadeshi Heritage</h3>
            <p>Preserving and celebrating India's rich cultural heritage for Atmanirbhar Bharat.</p>
            <div className="footer-logo-wrap">
              <img
                src="/atmanirbhar-logo.jpg"
                alt="Atmanirbhar Bharat Logo"
                className="footer-atmanirbhar-logo"
              />
            </div>
            <div className="social-links">
              <a href="https://github.com/sandipanr2004" aria-label="GitHub"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/sandipan-roy02" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/heritage">All Heritage</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Community</h4>
            <ul>
              <li><Link to="/contribute">Contribute</Link></li>
              <li><Link to="/register">Join Us</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p><strong>Atmanirbhar Bharat</strong></p>
          <p>&copy; {new Date().getFullYear()} Swadeshi Heritage.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

