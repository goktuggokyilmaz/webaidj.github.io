import React, { useState, useEffect } from 'react';
import './playlistpanel.css';

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  // Generate default playlist name based on existing local storage data
  useEffect(() => {
    setPlaylistName(generateDefaultPlaylistName());
  }, []);

  const generateDefaultPlaylistName = () => {
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    const lastPlaylistId = savedPlaylists.length > 0 
      ? parseInt(savedPlaylists[savedPlaylists.length - 1].name.match(/\d+/)[0], 10) 
      : 0;
    return `Playlist#${lastPlaylistId + 1}`;
  };

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mp3Files = files
      .filter((file) => file.type === 'audio/mpeg')
      .map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setCurrentPlaylist([...currentPlaylist, ...mp3Files]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (playlistName.trim() === '') {
      alert('Playlist name cannot be empty');
      return;
    }

    if (currentPlaylist.length === 0) {
      alert('Please add some songs to the playlist');
      return;
    }

    // Save new playlist in local storage
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    const newPlaylist = { name: playlistName, songs: currentPlaylist };
    localStorage.setItem('playlists', JSON.stringify([...savedPlaylists, newPlaylist]));

    // Reset form inputs
    setPlaylistName(generateDefaultPlaylistName());
    setCurrentPlaylist([]);
    alert('Playlist created successfully!');
  };

  const handleDeleteSong = (indexToDelete) => {
    const updatedSongs = currentPlaylist.filter((_, index) => index !== indexToDelete);
    setCurrentPlaylist(updatedSongs);
  };


  return (
    <div className="playlist-panel">
      <div class="playlist-header">
        <h2 class="playlist-title">Create Your Playlist</h2>
      </div>

      {/* Playlist Creation Form */}
      <form className="playlist-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={playlistName}
          onChange={handleInputChange}
          placeholder="Enter playlist name"
          className="playlist-input"
        />
        <input
          type="file"
          accept=".mp3"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="create-button">Save Playlist</button>
        <button className="generate-button">Generate Playlist</button>
      </form>
      <p className='playlistparagraph'> 
      Add mp3 files of songs to your playlist, then click the "Generate Playlist" button to organize your selections. Our model will then create seamless transitions between the songs.</p>
      {/* Display Current Playlist Songs as a List */}
      <h3>Playlist Songs</h3>
      <ul className="song-list">
        {currentPlaylist.map((song, index) => (
          <li key={index} className="song-item">
            <span className="song-name">{song.name}</span>
            <audio controls src={song.url} className="audio-player" />
            <button
              className="delete-button"
              onClick={() => handleDeleteSong(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPanel;
