const express = require('express');
const Playlist = require('../models/Playlist');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

// Get Playlists for Authenticated User
router.get('/api/playlists', authenticateJWT, async (req, res) => {
  const userId = req.userId; // Get userId from the JWT token (set in middleware)

  try {
    const playlists = await Playlist.find({ userId }); // Find playlists for the specific user
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add Playlist for Authenticated User
router.post('/api/playlists', authenticateJWT, async (req, res) => {
  const userId = req.userId; // Get userId from the JWT token
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Playlist name is required' });
  }

  try {
    const newPlaylist = new Playlist({ name, userId });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error('Error adding playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Playlist for Authenticated User
router.delete('/api/playlists/:id', authenticateJWT, async (req, res) => {
  const userId = req.userId; // Get userId from the JWT token
  const playlistId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or you do not have permission' });
    }

    await Playlist.deleteOne({ _id: playlistId });
    res.status(200).json({ message: 'Playlist deleted' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
