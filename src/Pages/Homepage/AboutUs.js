import React from 'react';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <section id="about-us">
            <div className="AboutUsContainer">
      <div className="GradientOverlay"></div>
      <div className="Content">
        <h1 className="AboutUsTitle">About Us</h1>
        <p className="AboutUsText">
          Welcome to our platform where music meets intelligence. We strive to create a seamless experience for music lovers and DJs alike. Our AI-driven solutions enhance your musical journey, providing tailored recommendations and innovative tools for a truly unique experience.
        </p>
        <p className="AboutUsText">
          Our team of passionate individuals is dedicated to pushing the boundaries of what is possible in the music industry. Join us as we redefine the way you experience sound.
        </p>
      </div>
    </div>
    </section>

  );
};

export default AboutUs;
