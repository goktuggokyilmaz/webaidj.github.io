import React, { useState } from 'react';
import './transition.css';

const CreateTransition = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const handleFileChange1 = (e) => setFile1(e.target.files[0]);
  const handleFileChange2 = (e) => setFile2(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) {
      alert("Please upload two files.");
      return;
    }

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("duration", 3000); // Crossfade duration in milliseconds

    const response = await fetch("http://localhost:8000/crossfade/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } else {
      alert("Failed to generate crossfade.");
    }
  };

  return (
    <div className="create-transition">
      <h2>Create Transition</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First MP3 File:</label>
          <input type="file" accept=".mp3" onChange={handleFileChange1} />
        </div>
        <div>
          <label>Second MP3 File:</label>
          <input type="file" accept=".mp3" onChange={handleFileChange2} />
        </div>
        <button type="submit">Generate Crossfade</button>
      </form>
      
      {resultUrl && (
        <div className="result-section">
          <h3>Download Crossfaded File:</h3>
          <a href={resultUrl} download="crossfaded.mp3">Download MP3</a>
          <audio className="audio-player" controls src={resultUrl} />
        </div>
      )}
    </div>
  );
};

export default CreateTransition;
