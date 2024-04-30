const express = require('express');
const authenticate = require('../middleware/authentication');
const contactController = require('../controllers/contactController');

const router = express.Router();

//create route
router.post('/create', contactController.createContact);
//get all route
router.get('/all', authenticate, contactController.getAllContacts);
//delete route
router.delete('/delete/:id', authenticate, contactController.deleteContactById);

module.exports = router;
