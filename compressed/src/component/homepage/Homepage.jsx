import React, { useState, useEffect } from 'react';
import { FaGoogleDrive } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa6";
import "./Homepage.scss";
import CompressArea from '../compressarea/CompressArea';

const Homepage = () => {
  const [fileContainer, setFileContainer] = useState([]);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Function to send the file to the backend for compression
  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:4000/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optionally handle response here
    } catch (error) {
      console.error('Error compressing PDF:', error);
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileContainer(file);

    // Call the function to send the file to the backend for compression
    sendFileToBackend(file);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        // Stop the progress when it reaches 100%
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoadingComplete(true); // Set loading complete flag
        }
        return newProgress;
      });
    }, 500);
  };

  useEffect(() => {
    if (loadingComplete) {
      setOpen(true);
    }
  }, [loadingComplete]);

  return (
    <>
      <div className='outer'>
        <div className="inner">
          <h3>Compress your file into less size but quality remain same</h3>
          <div className="upload">
            <label htmlFor="fileInput">Upload File</label>
            <input type="file" id="fileInput" onChange={handleFileUpload} />
          </div>
          {loadingComplete ? (
            <div className="loading-complete">Loading Complete!</div>
          ) : (
            <div className="loading-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          <div className="icon">
            <FaGoogleDrive />
            <FaDropbox />
          </div>
        </div>
      </div>
      {open && <CompressArea setOpen={setOpen} fileContainer={fileContainer} />}
    </>
  );
};

export default Homepage;
