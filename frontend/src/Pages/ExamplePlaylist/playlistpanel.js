import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './playlistpanel.css'; // Import the CSS file

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState(''); // State to store the input
  const [playlists, setPlaylists] = useState([]); // State to store the list of playlists

  const [trackData, setTrackData] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/api/track-analysis`)
      .then(response => {
        setTrackData(response.data);
      })
      .catch(error => {
        console.error("Error fetching track analysis:", error);
      });
  }, [backendUrl]);

  // Handle the change in the input field
  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  // Handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (playlistName.trim() === '') {
      alert('Playlist name cannot be empty');
      return;
    }

    // Add new playlist to the list
    setPlaylists([...playlists, playlistName]);
    setPlaylistName(''); // Clear the input after adding
  };

  // Function to delete a playlist
  const handleDeletePlaylist = (indexToDelete) => {
    const updatedPlaylists = playlists.filter((_, index) => index !== indexToDelete);
    setPlaylists(updatedPlaylists);
  };

  return (
    <div className="playlist-panel">
      <h2>Create a Playlist</h2>

<h2>Total Tracks Analyzed: {trackData ? trackData.total_tracks_analyzed : 'Loading...'}</h2>
      {trackData && trackData.tracks.map(track => (
        <div key={track.track_id}>
          <h3>Track ID: {track.track_id}</h3>
          {track.features.map((feature, index) => (
            <div key={index}>
              <p>Danceability: {feature.danceability}</p>
              <p>Energy: {feature.energy}</p>
              <p>Loudness: {feature.loudness}</p>
              {/* Add more features as needed */}
            </div>
          ))}
        </div>
      ))}

      {/* Playlist Creation Form */}
      <form className="playlist-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={playlistName}
          onChange={handleInputChange}
          placeholder="Enter playlist name"
          className="playlist-input"
        />
        <button type="submit" className="create-button">Create</button>
      </form>

      {/* Display List of Playlists */}
      <ul className="playlist-list">
        {playlists.map((playlist, index) => (
          <li key={index} className="playlist-item">
            <span>{playlist}</span>
            <button
              className="delete-button"
              onClick={() => handleDeletePlaylist(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPanel;
