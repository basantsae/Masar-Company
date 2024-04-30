const jwt = require('jsonwebtoken');
const {Admin} = require('../models/AllModels');
const { AppError } = require('../utils/error');

// Middleware function to authenticate user requests
const authenticate = async (req, res, next) => {
  try {
    // 1. Get the token from the request header
    const token = req.header('Authorization');

    // 2. If no token is provided, send an error response
    if (!token) {
      throw new AppError('Authentication failed. No token provided.', 401);
    }

    // 3. Verify the token and extract the admin data
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4. Find the admin in the database using the decoded admin ID
    const admin = await Admin.findByPk(decoded.id);

    // 5. If no admin is found, send an error response
    if (!admin) {
      throw new AppError('Admin not found.', 404);
    }

    // 6. Attach the admin object to the request for use in route handlers
    req.admin = admin;
    next();
  } catch (error) {
    // 7. Handle errors gracefully
    next(error); 
  }
};

module.exports = authenticate;
