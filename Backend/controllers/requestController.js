// requestController.js
const { Request } = require('../models/AllModels');
const { AppError } = require('../utils/error');

const requestController = {
  // Create a new request
  createRequest: async (req, res,next) => {
    try {
      const request = await Request.create(req.body);
      res
        .status(201)
        .json({ request, message: 'Request created successfully' });
    } catch (error) {
      console.error('Error creating property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  // Read all requests
  getAllRequests: async (req, res,nex) => {
    try {
      const requests = await Request.findAll();
      res.json({ requests });
    } catch (error) {
      console.error('Error creating property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  // Delete a request by ID
  deleteRequestById: async (req, res,next) => {
    const { id } = req.params;
    try {
      const request = await Request.findByPk(id);

      if (!request) {
        return next(new AppError('Request not found', 404));
      }

      await request.destroy();
      res.json({ message: 'Request deleted successfully' });
    } catch (error) {
      console.error('Error creating property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
};

module.exports = requestController;
