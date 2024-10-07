import './App.css';
import Homepage from './Pages/Homepage/HomePage'; // Importing the Homepage component
import SignInPage from './Pages/SignInPage/SignIn';
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;

