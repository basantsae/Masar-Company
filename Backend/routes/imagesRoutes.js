const express = require('express');
const router = express.Router();
const getImages = require('../controllers/imgesController');

// Route to serve images
router.get('/:imageName', getImages);
module.exports = router;
