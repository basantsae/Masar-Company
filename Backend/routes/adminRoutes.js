// routes/adminRoutes.js
require('dotenv').config();
const express = require('express');
const authenticate = require('../middleware/authentication');
const authAdmin = require('../middleware/authAdmin');
const adminController = require('../controllers/adminController');
const {
  validateRequests,
  validateAdminUpdate,
  validateAdminLogin,
  validateAdminRegister,
} = require('../middleware/validation');

const router = express.Router();

// Login route
router.post(
  '/login',
  validateRequests(validateAdminLogin),
  adminController.loginAdmin
);

// Update route
router.put(
  '/update',
  authenticate,
  validateRequests(validateAdminUpdate),
  adminController.updateAdmin
);

// Register route
router.post(
  '/register',
  authAdmin,
  validateRequests(validateAdminRegister),
  adminController.registerAdmin
);

router.get('/All', authAdmin, adminController.getAllAdmins);

router.delete('/delete/:id', authAdmin, adminController.deleteAdminById);

module.exports = router;
