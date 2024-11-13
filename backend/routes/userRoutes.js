const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add JWT for creating tokens
const User = require('../models/User'); // Import User model
const authenticateJWT = require('../middleware/authenticate'); // Your JWT authentication middleware

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create and save new user with plain-text password
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password (not recommended)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user details for the authenticated user
router.get('/user', authenticateJWT, async (req, res) => {
  const userId = req.userId;  // Extract userId from the JWT token (set by the middleware)

  try {
    const user = await User.findById(userId); // Fetch the user by ID from the database

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back the user's email
    res.json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
