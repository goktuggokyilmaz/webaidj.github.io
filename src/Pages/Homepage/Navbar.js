// navbar.js

import React, { useState } from 'react';
import "./Navbar.css"
import your_logo_path from "../../DJAILogo.png"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook to handle redirection
  const handleSign = () => {
    navigate("/signin"); // Redirect to the homepage when the close button is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbardiv">
      <div className="navbar">
        <img src={your_logo_path} className="djai2"alt="Logo" />
        <div className="ai-dj">AI DJ</div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <a href="#about-us">About Us</a>
          <a href="#our-team">Our Team</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href="#sign-in" onClick={handleSign}>Sign In</a>
        </div>

        {/* Desktop Menu */}
        <div className="aboutusbutton">About Us</div>
        <div className="contactbutton">Contact</div>
        <div className="signinbutton" onClick={handleSign}>Sign In</div>
      </div>
    </div>
  );
};

export default Navbar;
