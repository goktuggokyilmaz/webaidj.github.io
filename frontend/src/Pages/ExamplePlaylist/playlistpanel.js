import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './playlistpanel.css'; // Import the CSS file

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState(''); // State to store the input
  const [playlists, setPlaylists] = useState([]); // State to store the list of playlists
  const [trackData, setTrackData] = useState(null); // State to store track data
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch existing playlists
    axios.get(`${backendUrl}/api/playlists`)
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
      });

    // Fetch track analysis
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

    // Send new playlist to the backend
    axios.post(`${backendUrl}/api/playlists`, { name: playlistName })
      .then(response => {
        setPlaylists([...playlists, playlistName]); // Update local state
        setPlaylistName(''); // Clear the input after adding
      })
      .catch(error => {
        console.error("Error adding playlist:", error);
      });
  };

  // Function to delete a playlist
  const handleDeletePlaylist = (indexToDelete) => {
    axios.delete(`${backendUrl}/api/playlists/${indexToDelete}`)
      .then(() => {
        const updatedPlaylists = playlists.filter((_, index) => index !== indexToDelete);
        setPlaylists(updatedPlaylists);
      })
      .catch(error => {
        console.error("Error deleting playlist:", error);
      });
  };

  return (
    <div className="playlist-panel">
      <h2>Create a Playlist</h2>

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
