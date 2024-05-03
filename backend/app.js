// server.js

const express = require('express');
const multer = require('multer');
const compressPdf = require('compress-pdf');
const fs = require('fs');

const app = express();
const port = 4000;

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint for uploading and compressing PDF files
app.post('/compress', upload.single('pdf'), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Compress PDF
    const compressedPdf = await compressPdf(req.file.path);

    // Send compressed PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=compressed.pdf');
    fs.createReadStream(compressedPdf).pipe(res);

    // Clean up temporary files
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(compressedPdf);
  } catch (error) {
    console.error('Error compressing PDF:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
