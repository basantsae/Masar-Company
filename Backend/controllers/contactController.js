// contactController.js
const { Contact } = require('../models/AllModels');
const { AppError } = require('../utils/error');

const contactController = {
  // Create a new contact
  createContact: async (req, res,next) => {
    try {
      const contact = await Contact.create(req.body);
      res
        .status(201)
        .json({ contact, message: 'Contact created successfully' });
    } catch (error) {
      console.error('Error fetching properties:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  // Read all contacts
  getAllContacts: async (req, res,next) => {
    try {
      const contacts = await Contact.findAll();
      res.json({ contacts });
    } catch (error) {
      console.error('Error fetching properties:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  // Delete a contact by ID
  deleteContactById: async (req, res,next) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findByPk(id);

      if (!contact) {
        return next(new AppError('Contact not found', 404));
      }

      await contact.destroy();
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error fetching properties:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
};

module.exports = contactController;
