import React, { useState, useEffect, act } from 'react';
import './playlistpanel.css';
import ServiceConstants from '../../constants/ServiceConstants';
import axios from 'axios';

const PlaylistPanel = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [generatedPlaylists, setGeneratedPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(''); // Default to empty
  const [generatedMp3Url, setGeneratedMp3Url] = useState(null); // State to store the MP3 URL
  const [times, setTimes] = useState([]);
  const [songNames, setSongNames] = useState([]); // State to store song names
  const [songNamesArray, setSongNamesArray] = useState([]); // State to store song names
  let [actualSelectedPlaylist, setActualSelectedPlaylist] = useState([]); // State to store the selected playlist
  const [isLoading, setIsLoading] = useState(false);
  const [combinedPlaylist, setCombinedPlaylist] = useState([]);

  // Generate default playlist name based on existing local storage data
  useEffect(() => {
    setPlaylistName(generateDefaultPlaylistName());
  }, []);

  const generateDefaultPlaylistName = () => {
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    if (savedPlaylists.length === 0) {
      return 'Playlist#1';
    }
  
    const lastPlaylist = savedPlaylists[savedPlaylists.length - 1];
    const match = lastPlaylist.name.match(/\d+/);
    const lastPlaylistId = match ? parseInt(match[0], 10) : 0;
  
    return `Playlist#${lastPlaylistId + 1}`;
  };

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get the File objects
    const mp3Files = files
      .filter((file) => file.type === "audio/mpeg") // Only allow MP3 files
      .map((file) => ({
        name: file.name,
        file: file, // Save the actual File object
        url: URL.createObjectURL(file), // For audio preview
      }));
  
    setCurrentPlaylist((prevPlaylist) => [...prevPlaylist, ...mp3Files]);
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (playlistName.trim() === '') {
      alert('Playlist name cannot be empty');
      return;
    }

    /*if (currentPlaylist.length === 0) {
      alert('Please add some songs to the playlist');
      return;
    }*/

    // Save new playlist in local storage
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    const newPlaylist = { name: playlistName, songs: currentPlaylist };
    localStorage.setItem('playlists', JSON.stringify([...savedPlaylists, newPlaylist]));

    // Reset form inputs
    setPlaylistName(generateDefaultPlaylistName());
    setCurrentPlaylist([]);
    console.log('Please wait for the playlist to be processed.');
  };

  const handleDeleteSong = (indexToDelete) => {
    const updatedSongs = currentPlaylist.filter((_, index) => index !== indexToDelete);
    setCurrentPlaylist(updatedSongs);
  };

  const handleGeneratePlaylist = async () => {
    try {
      if (currentPlaylist.length === 0) {
        throw new Error("The playlist is empty. Please add some songs before generating the playlist.");
      }
      if (currentPlaylist.length <= 3) {
        throw new Error("The playlist is too short. Please add more songs before generating the playlist.");
      }

      setIsLoading(true); // Show loading screen

      alert("Please wait for the playlists to be generated.");
      const formData = new FormData();
      formData.append("playlist_name", playlistName);

      currentPlaylist.forEach((song, index) => {
        console.log(`Adding file ${index}:`, song.file);
        formData.append("files", song.file); // Ensure 'song.file' is a File object
      });

      console.log("Sending FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const processStartTime = performance.now();
      // First POST request to process the playlist
      const processResponse = await axios.post(ServiceConstants.PROCESS_PLAYLIST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const processEndTime = performance.now();

      const processDuration = processEndTime - processStartTime;

      alert("Songs uploaded successfully!\nPlease wait for the playlist to be generated.");
      console.log(`Uploading songs took ${(processDuration*0.001/60).toFixed(2)} minutes.`);
      console.log(processResponse.data);

      // Prepare data for the second POST request to generate the playlist
      const generatePlaylistData = {
        playlist_id: processResponse.data.playlist_id, // Assuming the response contains a playlist_id
        // Add any other necessary data for generating the playlist
      };

      const generationStartTime = performance.now();
      // Second POST request to generate the playlist
      const generatePlaylistResponse = await axios.post(ServiceConstants.GENERATE_PLAYLIST, generatePlaylistData, {
        headers: { "Content-Type": "application/json" },
      });

      const generationEndTime = performance.now();
      const generationDuration = generationEndTime - generationStartTime;

      alert("Playlist generated successfully!");
      console.log(`Playlist generation took ${(generationDuration*0.001/60).toFixed(2)} minutes.`);
      console.log(generatePlaylistResponse.data);
      setIsLoading(false); // Show loading screen

      // Assuming the response contains playlist details
    const newGeneratedPlaylists = generatePlaylistResponse.data.playlists;
    console.log("New Generated Playlists:", newGeneratedPlaylists);

    // Check if each generated playlist has 3 or fewer songs
    newGeneratedPlaylists.forEach((playlist) => {
      if (playlist[0].length < 3) {
        throw new Error(`The generated playlist is too short or songs are incompatible!`);
      }
    });

    setGeneratedPlaylists(newGeneratedPlaylists);

    // Merge new generated playlists with existing ones in local storage
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    const updatedPlaylists = [...savedPlaylists, ...newGeneratedPlaylists];
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));


    } catch (error) {
      console.error("Error processing playlist or generating playlist:", error);
      alert("An error occurred while processing the playlist or generating the playlist.");
      setIsLoading(false); // Hide loading screen
    }
  };

  const handleGenerateTransition = async () => {
  try {

    setIsLoading(true); // Show loading screen

    console.log("Selected Playlist ID:", selectedPlaylistId);
    console.log("Generated Playlists:", generatedPlaylists);

    // Get the selected playlist
    const selectedPlaylist = generatedPlaylists[selectedPlaylistId];
    actualSelectedPlaylist = selectedPlaylist[0]; // Assuming the selected playlist is an array
    console.log("Actual Selected Playlist:", actualSelectedPlaylist);

    if (!actualSelectedPlaylist) {
      throw new Error("Selected playlist is undefined");
    }

    // Prepare data for the third POST request to generate the transition
    const transitionFormData = new FormData();
    transitionFormData.append("playlist_name", playlistName); // Add the playlist name

    for (let i = 0; i < actualSelectedPlaylist.length; i++) {
      transitionFormData.append('song_paths', "uploaded_songs/" + actualSelectedPlaylist[i]); // Assuming each song has a 'path' property
    }

    // Append each song path to the form data
    /*actualSelectedPlaylist.forEach((song, index) => {
      console.log(`song_paths[${index}]`, song.path);
      transitionFormData.append(`song_paths[${index}]`, song.path); // Assuming each song has a 'path' property
    });*/

    console.log("Sending transition data:");
    for (let [key, value] of transitionFormData.entries()) {
      console.log(key, value);
    }

    // Measure the time taken for the third POST request
    const startTime = performance.now();

    // Third POST request to generate the transition
    const transitionResponse = await axios.post(ServiceConstants.GENERATE_TRANSITION, transitionFormData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: 'blob', // Ensure the response is treated as a blob
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    alert("Transition generated successfully!");
    console.log(`Transition generation took ${(duration*0.001/60).toFixed(2)} minutes.`);
    //console.log(transitionResponse.data);

    // Create a URL for the MP3 file
    const mp3Url = URL.createObjectURL(transitionResponse.data);
    setGeneratedMp3Url(mp3Url);


    for (let i = 0; i < actualSelectedPlaylist.length; i++) {
      songNamesArray.push(actualSelectedPlaylist[i]);
    }
    setSongNames(songNamesArray);

    const timesResponse = await axios.post(ServiceConstants.GET_TIMES);
    const timesArray = [0, ...timesResponse.data.times];
    console.log("Transition times:", timesArray);
    setTimes(timesArray);

    const combined = [];
    for (let i = 0; i < timesArray.length; i++) {
      combined.push({ song:actualSelectedPlaylist[i], time: timesArray[i] });
    }

    setCombinedPlaylist(combined);

    console.log(combinedPlaylist)

    setIsLoading(false); // Hide loading screen

  } catch (error) {
    console.error("Error generating transition:", error);
    alert("An error occurred while generating the transition.");
    setIsLoading(false); // Hide loading screen
  }
};
   
  const jumpToTime = (time) => {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
      audioPlayer.currentTime = time;
      audioPlayer.play();
    }
  };

  return (
    <div className="playlist-panel">
      
      <div className="playlist-header">
        <h2 className="playlist-title">Create Your Playlist</h2>
      </div>

      {/* Playlist Creation Form */}
      <form className="playlist-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={playlistName}
          onChange={handleInputChange}
          placeholder="Enter playlist name"
          className="playlist-input"
          disabled={isLoading}
        />
        <input
          type="file"
          accept=".mp3"
          multiple
          onChange={handleFileChange}
          className="file-input"
          disabled={isLoading}
        />
        <button type="submit" className="create-button"
                onClick={handleGeneratePlaylist}
                disabled={isLoading}
                >Save Playlist</button>
        <button className="generate-button"
                onClick={handleGenerateTransition}
                disabled={isLoading}>
                  Generate Transition</button>
      </form>

      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}

      <div className='playlistparagraph'> 
        <p>Here's a step-by-step guide to creating your playlist:</p>
        <ol>
          <li>Enter a name for your playlist in the text box.</li>
          <li>Click the "Choose Files" button to select MP3 files from your computer.</li>
          <li>Click the "Save Playlist" button to create your playlist.</li>
          <li>Wait for the playlist to be processed and generated.</li>
          <li>Once that is completed, click the "Generate Transition" button to create a seamless transition between the songs.</li>
          <li>Enjoy your playlist!</li>
        </ol>

        <p className="warning-message">
          <strong>Note</strong> 
          <li>The transition generation process may take a few minutes depending on the number of songs and their lengths. Please be patient and do not close the browser window during this time.</li>
          <li>The songs selected and generated playlist will only be stored temporarily. We advise you to download the generated playlist.</li>
        </p>


      </div>
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

      {generatedPlaylists.length > 0 && (
        <div>
          <h3>Generated Playlists</h3>
          {generatedPlaylists.map((playlist, playlistIndex) => (
            <div key={playlistIndex}>
              <h4>Playlist {playlistIndex + 1}</h4>
              <ul>
                {playlist[0].map((song, songIndex) => (
                  <li key={songIndex}>{song}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {generatedPlaylists.length > 0 && (
        <div className="generated-playlist-section">
          <label className="generated-playlist-label">Select Generated Playlist:</label>
          <select
            className="generated-playlist-select"
            value={selectedPlaylistId}
            onChange={(e) => setSelectedPlaylistId(e.target.value)}
          >
            {generatedPlaylists.slice(0, 3).map((playlist, index) => (
              <option key={index} value={index}> Playlist {index+1}</option>
            ))}
          </select>
        </div>
      )}

    {generatedMp3Url && (
        <div>
          <h3>Generated Transition</h3>
          <audio id="audio-player" controls src={generatedMp3Url} className="audio-player" />
          <div>
            {combinedPlaylist.map((item, index) => (
              <li key={index}>
                <button onClick={() => jumpToTime(item.time)}>
                {item.song} - {Math.floor(item.time / 60)}:{Math.floor(item.time % 60).toString().padStart(2, '0')} minutes
                </button>
              </li>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default PlaylistPanel;
