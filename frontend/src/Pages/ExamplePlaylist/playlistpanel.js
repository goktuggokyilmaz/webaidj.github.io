import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './playlistpanel.css'; // Import the CSS file
import UserProfile from '../../components/UserProfile';

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState(''); // State to store the input
  const [playlists, setPlaylists] = useState([]); // State to store the list of playlists
  const [userEmail, setUserEmail] = useState(''); // State to store the user's email
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Retrieve JWT token from localStorage
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      // Fetch user-specific playlists
      axios.get(`${backendUrl}/api/playlists`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
      })
        .then(response => {
          setPlaylists(response.data); // Update playlists state
        })
        .catch(error => {
          console.error("Error fetching playlists:", error);
        });
    }
  }, [backendUrl, token]); // Dependencies for useEffect: backendUrl and token

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

    // Send new playlist to the backend with the JWT token
    axios.post(`${backendUrl}/api/playlists`, { name: playlistName }, {
      headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
    })
      .then(response => {
        const newPlaylist = response.data; // Get the new playlist object from the response
        setPlaylists([...playlists, newPlaylist]); // Update local state with new playlist
        setPlaylistName(''); // Clear the input after adding
      })
      .catch(error => {
        console.error("Error adding playlist:", error);
      });
  };

  // Function to delete a playlist
  const handleDeletePlaylist = (playlistId) => {
    axios.delete(`${backendUrl}/api/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
    })
      .then(() => {
        const updatedPlaylists = playlists.filter((playlist) => playlist._id !== playlistId);
        setPlaylists(updatedPlaylists); // Update playlists state to remove deleted playlist
      })
      .catch(error => {
        console.error("Error deleting playlist:", error);
      });
  };

  return (
    <div className="playlist-panel">
      <h2>Create a Playlist</h2>

      {/* Display the user's email if it's available */}
      {userEmail && <p>Welcome, {userEmail}</p>}

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
        {playlists.map((playlist) => (
          <li key={playlist._id} className="playlist-item"> {/* Use _id as key */}
            <span>{playlist.name}</span> {/* Display playlist name */}
            <button
              className="delete-button"
              onClick={() => handleDeletePlaylist(playlist._id)}
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
