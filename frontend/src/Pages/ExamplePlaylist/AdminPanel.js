import React, { useState, useEffect } from 'react';
import PlaylistPanel from './playlistpanel.js'; // Component for creating a playlist
import CreateTransition from './transition.js'
import DiscoverPlaylists from './discoverplaylist.js';

import { useNavigate } from 'react-router-dom';
import './adminpanel.css';
import your_logo_path from "../../DJAILogo.png";
import { FaCompactDisc } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { PiMusicNotesPlusFill } from "react-icons/pi";


const AdminPanel = () => {
  const [selectedContent, setSelectedContent] = useState('playlists');
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null); // Track the active playlist
  const [generatedPlaylists, setGeneratedPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(storedPlaylists);
  }, []);

  const handleLogOut = () => {
    navigate("/");
  };

  const handleContentChange = (content, playlist = null) => {
    setSelectedContent(content);
    setActivePlaylist(playlist); // Set the active playlist if provided
    setIsLibraryExpanded(false); // Collapse the library on content change
  };

  const toggleLibrary = () => {
    setIsLibraryExpanded(!isLibraryExpanded);
  };

  const handleDeletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter((_, index) => index !== playlistId);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
    setActivePlaylist(null); // Reset active playlist if it was deleted
  };

  return (
    <div className="admin-panel">
      <div className="admin-navbar">
        <div className="admin-ai-logo">
          <img src={your_logo_path} className="admin-djai2" alt="Logo" />
          <div className="admin-ai-dj">AI DJ</div>
        </div> 
      </div>

      <div className="admin-layout">
        <div className="sidebar">
          <ul className="sidebar-up-menu">
            <li onClick={() => handleContentChange('playlists')}><FaCompactDisc /> Top playlists</li>
            <li className="library-section">
              <div className="library-header" onClick={toggleLibrary}>
                <MdLibraryMusic /> Your Library
                <AiOutlinePlus 
                  className="add-playlist-button"
                  onClick={() => handleContentChange('create-playlist')}
                />
              </div>

              {isLibraryExpanded && (
                <ul className="library-playlist-list">
                  {playlists.map((playlist, index) => (
                    <li key={index} onClick={() => handleContentChange('view-playlist', playlist)}>
                      {playlist.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li onClick={() => handleContentChange('discover')}><RiRobot2Fill /> Discover</li>
            <li onClick={() => handleContentChange('create-transition')}><PiMusicNotesPlusFill /> Transition</li>
          </ul>
          <ul className='sidebar-down-menu'>
            <li className="admin-sidebar-logout" onClick={handleLogOut}>
              Log Out <LuLogOut />
            </li>
          </ul>
        </div>

        <div className="admin-main-content">
          {selectedContent === 'playlists' && <h2>Top Playlists according to our users</h2>}
          {selectedContent === 'create-playlist' && <PlaylistPanel />}
          {selectedContent === 'view-playlist' && activePlaylist && (
            <div>
              <h2>{activePlaylist.name}</h2>
              <p>Playlist details will be shown here.</p>
              <button onClick={() => handleDeletePlaylist(playlists.indexOf(activePlaylist))}>Delete Playlist</button>
              {/* Add more components or details here as needed */}
            </div>
          )}
          {selectedContent === 'discover' && <DiscoverPlaylists />}
          {selectedContent === 'create-transition' && <CreateTransition />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
