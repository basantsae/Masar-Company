// controllers/imagesController.js
const path = require('path');
const fs = require('fs');

const getImages = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', 'images', imageName);

  // Check if the file exists
  if (fs.existsSync(imagePath)) {
    // If the file exists, send it as a response
    res.sendFile(imagePath);
  } else {
    // If the file does not exist, return a 404 response
    res.status(404).json({ message: 'Image not found' });
  }
};

module.exports = getImages;
