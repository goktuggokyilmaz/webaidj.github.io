const express = require('express');
const Playlist = require('../models/Playlist');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Get the playlists for the authenticated user
router.get('/playlists', authenticate, async (req, res) => {
  const userId = req.userId;  // Extract userId from the JWT token (set by the middleware)

  try {
    // Find playlists by the userId
    const playlists = await Playlist.find({ userId });

    if (playlists.length === 0) {
      return res.status(404).json({ error: 'No playlists found for this user' });
    }

    // Send the playlists as a response
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new playlist
router.post('/playlists', authenticate, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Playlist name is required' });
  }

  try {
    const playlist = new Playlist({ name, user: req.user });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Delete a playlist
router.delete('/playlists/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findOneAndDelete({ _id: id, user: req.user });
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
});

module.exports = router;
