import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

import lightning from "../assets/lightning.png"
import "./Header.scss"


const Header = () => {
  const [arrowDown,setArrowDown]=useState(false)

  const toggleArrowDir=()=>{
    setArrowDown(!arrowDown)
  }
  return (
    <div className='main-header'>
      
        <div className="header-content">
          <div className="left">
            <h3>𝒸ℴ𝓂𝓅𝓇ℯ𝓈𝓈𝒾𝒻𝓎
              <img className='light' src={lightning} alt='bolt'/>
            </h3>
          </div>
          <div className="center">
          <h4 className={arrowDown ? "arrow-down" : "arrow-up"} onClick={toggleArrowDir}>
            Convert extensions {arrowDown ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </h4>
          </div>
          <div className="right">
            <button className='login'>Login</button>
            <button className='signUP'>signUP</button>
          </div>
        </div>
      
    </div>
  )
}

export default Header
