const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/compress', upload.single('pdf'), (req, res) => {
  const { path: filePath } = req.file;

  // Get file size
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error('Error getting file size:', err);
      return res.status(500).send('Error getting file size');
    }
    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    console.log('File size:', fileSizeInKilobytes, 'KB');

    // You can send the file size or send the file data here as per your requirement
    // For example:
    res.json({ fileSize: fileSizeInKilobytes });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
