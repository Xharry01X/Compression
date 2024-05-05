import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib'; // Only import PDFDocument from 'pdf-lib'
import axios from 'axios'; // Import Axios
import "./CompressArea.scss";

const CompressArea = ({ setOpen, fileContainer }) => {
    const [selectedPoint, setSelectedPoint] = useState(null);

    const handlePointSelect = (point) => {
        setSelectedPoint(point);
    }

    const compressFile = async () => {
        if (selectedPoint && fileContainer) {
            try {
                const pdfBytes = await fileContainer.arrayBuffer();
                const pdfDoc = await PDFDocument.load(pdfBytes);

                // Your logic for compression goes here...

                const modifiedPdfBytes = await pdfDoc.save();
                const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
                saveAs(modifiedPdfBlob, 'compressed.pdf');

                console.log('Compressed PDF:', modifiedPdfBytes); // Log the compressed PDF data

                // Prepare FormData
                const formData = new FormData();
                formData.append('file', new Blob([pdfBytes]), 'original.pdf');
                formData.append('id', '1');
                formData.append('compressionLevel', "low"); // Assuming selectedPoint holds the compression level

                // Send Axios request
                const response = await axios.post('https://api.pdfrest.com/compressed-pdf', formData, {
                    headers: {
                        'Api-Key': '4d7b75a5-026f-4538-a154-e87b00e0b736',
                        'Content-Type': 'multipart/form-data'
                    },
                    maxBodyLength: Infinity
                });
                console.log('Response:', response.data);

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
                    <div className="points" onClick={() => handlePointSelect('EXTREME')}>
                        <p>EXTREME</p>
                        <text>Less quality, High Compression</text>
                        {selectedPoint === 'EXTREME' && <FaCheckCircle />}
                    </div>
                    <div className="line" />
                    <div className="points" onClick={() => handlePointSelect('RECOMMENDED')}>
                        <p>RECOMMENDED</p>
                        <text>Good quality, Good Compression</text>
                        {selectedPoint === 'RECOMMENDED' && <FaCheckCircle />}
                    </div>
                    <div className="line" />
                    <div className="points" onClick={() => handlePointSelect('LESS')}>
                        <p>LESS</p>
                        <text>High quality, Less Compression</text>
                        {selectedPoint === 'LESS' && <FaCheckCircle />}
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
