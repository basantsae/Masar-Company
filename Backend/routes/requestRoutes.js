const express = require('express');
const authenticate = require('../middleware/authentication');
const requestController = require('../controllers/requestController');

const router = express.Router();

//create route
router.post('/create', requestController.createRequest);
//get all route
router.get('/all', authenticate, requestController.getAllRequests);
//delete route
router.delete('/delete/:id', authenticate, requestController.deleteRequestById);

module.exports = router;
