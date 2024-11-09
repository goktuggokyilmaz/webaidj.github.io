import React, { useState } from 'react';
import './SignIn.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import your_logo_path from "../../DJAILogo.png";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between Sign In and Sign Up
  const [rotate, setRotate] = useState(false); // State for rotation
  const navigate = useNavigate(); // Hook to handle redirection

  const toggleForm = () => {
    setRotate(true); // Trigger rotation
    setIsSignIn(prev => !prev); // Toggle between Sign In and Sign Up

    // Set timeout to reset rotation state
    setTimeout(() => {
      setRotate(false); // Reset rotation state
    }, 400); // Duration matches the CSS animation duration
  };

  const handleClose = () => {
    navigate("/"); // Redirect to the homepage when the close button is clicked
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault(); // Prevents page refresh on form submission

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully:', data);
        // Handle successful sign-up (e.g., redirect or show a success message)
      } else {
        const errorData = await response.json();
        console.error('Sign-up error:', errorData);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='signin-body'>
      <div className={`signin-container ${rotate ? 'rotate' : ''}`}>
        <button className="close-button" onClick={handleClose}>
          &times; {/* Close icon (X) */}
        </button>
        <div className="sign-near">
          <img src={your_logo_path} className="signin-logo" alt="Logo" />
          <h1 className="signin-title">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        </div>
        
        {isSignIn ? (
          <form className="signin-form">
            <input type="email" placeholder="Email" required className="signin-input" />
            <input type="password" placeholder="Password" required className="signin-input" />
            <button type="submit" className="signin-button">Sign In</button>
          </form>
        ) : (
          <form className="signin-form" onSubmit={signUp}>
            <input 
                type="email" 
                placeholder="Email" 
                required className="signin-input" 
                onChange={(e) => setEmail(e.target.value)} 
                />
            <input 
                type="password" 
                placeholder="Password" 
                required className="signin-input" 
                onChange={(e) => setPassword(e.target.value)} 
                />
            <input type="password" placeholder="Confirm Password" required className="signin-input" />
            <button type="submit" className="signin-button">Sign Up</button>
          </form>
        )}
        <p className="signin-footer">
          {isSignIn ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={toggleForm} className="toggle-button">
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
