import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import OurTeam from './OurTeam';
import Footer from './Footer';

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <OurTeam></OurTeam>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
