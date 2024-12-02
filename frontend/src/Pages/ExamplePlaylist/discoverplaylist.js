import React, { useEffect, useState } from "react";
import "./discoverplayer.css";
import CamelotKeyWheel from "./components/camelotkey";

const DiscoverPlaylists = () => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // Fetch playlist data from the backend
    fetch("http://localhost:8000/discover/")
      .then((response) => response.json())
      .then((data) => setPlaylist(data.playlist))
      .catch((error) => console.error("Error fetching playlist data:", error));
  }, []);

  const handleCheckpointClick = (audioPlayer, time) => {
    audioPlayer.currentTime = time; // Jump to the specified time
    audioPlayer.play();
  };

  return (
    <div className="playlist-player">
      <h2 className="player-title">Discover Playlist</h2>
      {playlist && (
        <div>
          {/* Audio Player */}
          <audio
            className="audio-player"
            controls
            src={`http://localhost:8000/discover/${playlist.filename}`}
            id="audio-player"
          ></audio>
          
          {/* Checkpoints */}
          <h3>Checkpoints</h3>
          <div className="checkpoints-div">
          <ul className="checkpoints">
            {playlist.checkpoints.map((checkpoint, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    handleCheckpointClick(
                      document.getElementById("audio-player"),
                      checkpoint.time
                    )
                  }
                  className="checkpoint-button"
                >
                  {checkpoint.title} - {checkpoint.camelotKey} - BPM:{" "}
                  {checkpoint.bpm.toFixed(2)} - Energy:{" "}
                  {checkpoint.energy.toFixed(2)}
                </button>
              </li>
            ))}
          </ul>
          <CamelotKeyWheel/>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPlaylists;
