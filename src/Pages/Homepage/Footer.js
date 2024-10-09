import React from 'react';
import './Footer.css'; // Import the CSS file
import SectionDivider from './SectionDivider';

const Footer = () => {
  return (
    <footer className="footer">
      <SectionDivider></SectionDivider>
      <div className="footer-container">
        {/* Links Section */}
        <div className="footer-links">
          <a href="#about-us" className="footer-link">About Us</a>
          <a href="#our-team" className="footer-link">Our Team</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#faq" className="footer-link">FAQ</a>
        </div>

        {/* Social Media Icons Section */}
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} AI DJ. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
