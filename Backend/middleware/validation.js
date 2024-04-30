const { validationResult, body } = require('express-validator');
const { AppError } = require('../utils/error');

// Middleware function for request validation using express-validator
const validateRequests = (validations) => {
  return async (req, res, next) => {
    // Execute the defined validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there are validation errors, send an error response
      const errorMessages = errors.array().map((error) => error.msg);
      next(new AppError(`Validation error: ${errorMessages.join(', ')}`, 400));
    } else {
      // If there are no validation errors, continue to the next middleware
      next();
    }
  };
};

// Validation rules for admin update
const validateAdminUpdate = [
  body('username').notEmpty().withMessage('username is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('currentPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation rules for admin login
const validateAdminLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
// Validation rules for admin login
const validateAdminRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('name').notEmpty().withMessage('name is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation rules for property
const validatePropertyCreate = [
  body('propertyType').notEmpty().withMessage('propertyType is required'),
  body('propertyFor').notEmpty().withMessage('propertyFor  is required'),
  body('propertySize').notEmpty().withMessage('propertySize  is required'),
  body('propertyPrice').notEmpty().withMessage('propertyPrice  is required'),
  body('propertyDescription')
    .notEmpty()
    .withMessage('propertyDescription  is required'),
  body('propertyLocation')
    .notEmpty()
    .withMessage('propertyLocation  is required'),
  body('bedrooms').notEmpty().withMessage('bedrooms  is required'),
  body('bathrooms').notEmpty().withMessage('bathrooms  is required'),
  body('propertyPictures')
    .notEmpty()
    .withMessage('propertyPictures  is required'),
];

module.exports = {
  validateRequests,
  validateAdminUpdate,
  validateAdminLogin,
  validateAdminRegister,
  validatePropertyCreate,
};
