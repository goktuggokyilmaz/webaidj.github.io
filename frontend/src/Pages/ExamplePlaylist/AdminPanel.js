import React, { useState } from 'react';
import PlaylistPanel from './playlistpanel.js'; // The Playlist creation component
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import './adminpanel.css';
import your_logo_path from "../../DJAILogo.png"
import UserProfile from '../../components/UserProfile.js';

const AdminPanel = () => {
  const [selectedContent, setSelectedContent] = useState('playlists'); // Default content
  const handleLogOut = () => {
    navigate("/"); // Redirect to the homepage when the close button is clicked
  };

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };
  const navigate = useNavigate(); // Hook to handle redirection

  return (
    <div className="admin-panel">
      {/* Navbar */}
      <div className="admin-navbar">
        <img src={your_logo_path} className="admin-djai2"alt="Logo" />
        <div className="admin-ai-dj">AI DJ</div>
      </div>

      {/* Admin panel layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebar-menu">
            <UserProfile />
            <li onClick={() => handleContentChange('playlists')}>MyLists</li>
            <li onClick={() => handleContentChange('users')}>Discover</li>
            <li className="admin-sidebar-logout"onClick={() => handleLogOut()}>Log Out</li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {selectedContent === 'playlists' && <PlaylistPanel />}
          {selectedContent === 'users' && <h2>Users Section</h2>}
          {selectedContent === 'settings' && <h2>Settings Section</h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
