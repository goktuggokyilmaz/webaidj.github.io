import React from 'react';
import './Hero.css'; // Import the CSS file
import crowdimagepath from "../../Crowdmusic.jpeg"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection

const Hero = () => {
  const navigate = useNavigate(); // Hook to handle redirection
  const handleDiscover = () => {
    navigate("/discover"); // Redirect to the homepage when the close button is clicked
  };
  return (
    <div className="Herodiv">
      
      <div className="HeroContent">
        <div className="HeroT1">Where Harmony Meets Intelligence.</div>
        <div className="HeroT2">AI DJ</div>
        <button onClick={handleDiscover} className="Discover-button"> Discover Now</button>
      </div>
      <img className="Crowdmusic1" src={crowdimagepath} alt="Background" />
    </div>
  );
};

export default Hero;
