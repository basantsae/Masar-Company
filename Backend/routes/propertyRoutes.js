const express = require('express');
const authenticate = require('../middleware/authentication');
const propertyController = require('../controllers/propertyController');
const {
  validateRequests,
  validatePropertyCreate,
} = require('../middleware/validation');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images/' }); // Specify the destination folder for uploaded files

//create route
router.post(
  '/create',
  authenticate,
  upload.array('images'),
  propertyController.createProperty
);
//get all route
router.get('/all', propertyController.getAllProperties);

//get by id
router.get('/view/:id', propertyController.getPropertyById);
//delete route
router.delete(
  '/delete/:id',
  authenticate,
  propertyController.deletePropertyById
);
//update route
router.put(
  '/update/:id',
  authenticate,
  upload.array('images'),
  propertyController.editProperty
);
// Corrected search route
router.get('/search', propertyController.searchProperties);

module.exports = router;
