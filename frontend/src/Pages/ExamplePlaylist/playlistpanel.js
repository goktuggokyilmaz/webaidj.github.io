import React, { useState, useEffect } from 'react';
import './playlistpanel.css'; // Import the CSS file

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState(''); // State to store the input
  const [playlists, setPlaylists] = useState([]); // State to store the list of playlists

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

  // Example using fetch in a React component
  const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/data"); // FastAPI URL
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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
