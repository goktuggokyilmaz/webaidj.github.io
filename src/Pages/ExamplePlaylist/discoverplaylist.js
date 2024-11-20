import React, { useEffect } from 'react';
import './discoverplayer.css';

const DiscoverPlaylists = () => {
  useEffect(() => {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");

    const handlePlayButtonClick = (event) => {
      const button = event.target;
      const track = button.parentElement;
      const trackSrc = track.getAttribute("data-src");

      // Load and play the selected track
      if (audioPlayer.src !== trackSrc) {
        audioPlayer.src = trackSrc;
        audioPlayer.play();
      } else if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      // Update button text based on play/pause state
      playButtons.forEach((btn) => (btn.textContent = "▶"));
      button.textContent = audioPlayer.paused ? "▶" : "⏸";
    };

    // Attach event listeners
    playButtons.forEach((button) =>
      button.addEventListener("click", handlePlayButtonClick)
    );

    // Clean up listeners on unmount
    return () => {
      playButtons.forEach((button) =>
        button.removeEventListener("click", handlePlayButtonClick)
      );
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="playlist-player">
      <h2 className="player-title">Playlist Player</h2>
      <ul className="playlist">
        <li className="track" data-src="public/playlists/playlist1.mp3">
          <span className="track-title">Playlist 1</span>
          <button className="play-button">▶</button>
        </li>
        <li className="track" data-src="public/playlists/playlist2.mp3">
          <span className="track-title">Playlist 2</span>
          <button className="play-button">▶</button>
        </li>
      </ul>
      <audio id="audio-player" controls></audio>
    </div>
  );
};

export default DiscoverPlaylists;
