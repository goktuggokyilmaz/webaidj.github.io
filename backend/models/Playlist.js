const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: String, // Each song can be stored as a string (e.g., song name or song ID)
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;
