import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

import "./CompressArea.scss";

const CompressArea = ({ setOpen, fileContainer }) => {
    const [selectedPoint, setSelectedPoint] = useState(null);

    const handlePointSelect = (point) => {
        setSelectedPoint(point);
    }

    const compressFile = async () => {
      if (selectedPoint && fileContainer) {
          try {
            
  
              setOpen(false);
          } catch (error) {
              console.error('Error compressing PDF:', error);
          }
      } else {
          alert("Please select a compression option first");
      }
  }
  

    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Compression Area</span>
                    <span className='close-btn'><AiOutlineClose onClick={() => setOpen(false)} /></span>
                </div>

                <div className="cart-footer">
                    <div className="subtotal">
                        <span className='text'>Compressing by selecting </span>
                    </div>
                    <div className="points" onClick={() => handlePointSelect('EXTREME COMPRESSION')}>
                        <p>EXTREME COMPRESSION</p>
                        <text>Less quality, High Compression</text>
                        {selectedPoint === 'EXTREME COMPRESSION' && <FaCheckCircle />}
                    </div>
                    <div className="line" />
                    <div className="points" onClick={() => handlePointSelect('RECOMMENDED COMPRESSION')}>
                        <p>RECOMMENDED COMPRESSION</p>
                        <text>Good quality, Good Compression</text>
                        {selectedPoint === 'RECOMMENDED COMPRESSION' && <FaCheckCircle />}
                    </div>
                    <div className="line" />
                    <div className="points" onClick={() => handlePointSelect('LESS COMPRESSION')}>
                        <p>LESS COMPRESSION</p>
                        <text>High quality, Less Compression</text>
                        {selectedPoint === 'LESS COMPRESSION' && <FaCheckCircle />}
                    </div>
                    <div className="line" />
                    <div className="button" onClick={compressFile}>
                        Compress File
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompressArea;
