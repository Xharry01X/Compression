import React, { useState } from 'react';
import { FaGoogleDrive } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa6";
import "./Homepage.scss";

const Homepage = () => {
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        // Stop the progress when it reaches 100%
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className='outer'>
      <div className="inner">
        <h3>Compress your file into less size but quality remain same</h3>
        <div className="upload">
          <label htmlFor="fileInput">Upload File</label>
          <input type="file" id="fileInput" onChange={handleFileUpload} />
        </div>
        <div className="loading-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="icon">
          <FaGoogleDrive />
          <FaDropbox />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
