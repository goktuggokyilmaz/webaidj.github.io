import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import OurTeam from './OurTeam';

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <OurTeam></OurTeam>
    </div>
  );
};

export default Homepage;
