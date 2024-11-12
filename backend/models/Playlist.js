const mongoose = require('mongoose');

// Define Playlist Schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
