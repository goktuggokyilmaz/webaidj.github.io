import React from 'react';
import './Hero.css'; // Import the CSS file
import crowdimagepath from "../../Crowdmusic.jpeg"

const Hero = () => {
  return (
    <div className="Herodiv">
      
      <div className="HeroContent">
        <div className="HeroT1">Where Harmony Meets Intelligence.</div>
        <div className="HeroT2">AI DJ</div>
        <button className="Discover-button"> Discover Now</button>
      </div>
      <img className="Crowdmusic1" src={crowdimagepath} alt="Background" />
    </div>
  );
};

export default Hero;
