import React from 'react'
import { FaGoogleDrive } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa6";
import "./Homepage.scss"

const Homepage = () => {


const handleFileUpload=(e)=>{
const file=e.target.files[0]
console.log(file);
}

  return (
    <div className='outer'>
      <div className="inner">
        <h3>Compress your file into less size but quality remain same</h3>
        <div className="upload">
          <label htmlFor='fileInput'>Upload File</label>
          <input type='file' id='fileInput' onChange={handleFileUpload}/>
          
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
