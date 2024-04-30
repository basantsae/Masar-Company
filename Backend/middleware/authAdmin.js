const { AppError } = require('../utils/error');
require('dotenv').config();

// Middleware function to authenticate Admins Registration
const authAdmin = async (req, res, next) => {
  try {
    // 1. Get the authentication value from the request header
    const authValue = req.header('Authorization');

    // 2. If no authentication value is provided, send an error response
    if (!authValue) {
      throw new AppError('Authentication failed. No value provided.', 401);
    }

    // 3. Check if the provided authentication value matches ADMIN_PASSCODE
    if (authValue !== process.env.ADMIN_PASSCODE) {
      throw new AppError('Invalid Passcode.', 401);
    }

    // 4. Authentication successful, proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authAdmin;
