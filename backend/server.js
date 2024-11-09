// Required dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); // Import routes

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Add prefix for API routes
app.use('/api', userRoutes);

// Initialize playlists array
let playlists = [];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


// Load existing playlists from JSON file on startup
const loadPlaylists = () => {
  const playlistsFilePath = path.join(__dirname, 'data', 'playlists.json');
  if (fs.existsSync(playlistsFilePath)) {
    const data = fs.readFileSync(playlistsFilePath, 'utf8');
    playlists = JSON.parse(data);
  }
};

// Save playlists to JSON file
const savePlaylists = () => {
  const playlistsFilePath = path.join(__dirname, 'data', 'playlists.json');
  fs.writeFileSync(playlistsFilePath, JSON.stringify(playlists, null, 2));
};

// Load playlists at server startup
loadPlaylists();

// Route to get track analysis from JSON file
app.get('/api/track-analysis', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'data', 'track_analysis_small.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return res.status(500).json({ error: 'Failed to read track analysis data' });
    }
    try {
      const trackData = JSON.parse(data);
      res.json(trackData);
    } catch (parseError) {
      console.error("Error parsing the JSON data:", parseError);
      return res.status(500).json({ error: 'Failed to parse track analysis data' });
    }
  });
});

// Route to get all playlists
app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

// Route to add a new playlist
app.post('/api/playlists', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Playlist name is required' });
  }
  playlists.push(name);
  savePlaylists(); // Save the updated playlists to the JSON file
  res.status(201).json({ message: 'Playlist added', name });
});

// Route to delete a playlist
app.delete('/api/playlists/:index', (req, res) => {
  const { index } = req.params;
  if (index < 0 || index >= playlists.length) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  playlists.splice(index, 1);
  savePlaylists(); // Save the updated playlists to the JSON file
  res.status(204).send(); // No content
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
