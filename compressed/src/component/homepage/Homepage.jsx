import React from 'react'
import { FaGoogleDrive } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa6";
import "./Homepage.scss"

const Homepage = () => {
  return (
    <div className='outer'>
      <div className="inner">
        <h3>Compress your file into less size but quality remain same</h3>
        <div className="upload">
          <text>upload here</text>
        </div>
            <div className="icon">
              <FaGoogleDrive/>
              <FaDropbox/>
            </div>
      </div>
    </div>
  )
}

export default Homepage
