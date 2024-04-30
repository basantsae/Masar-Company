// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/error');
const { Admin } = require('../models/AllModels');

const adminController = {
  registerAdmin: async (req, res, next) => {
    // Extract data from request body
    const { name, username, password } = req.body;

    try {
      // Check if admin with the same username already exists
      const existingAdmin = await Admin.findOne({ where: { username } });
      if (existingAdmin) {
        return next(new AppError('Username already in use', 400));
      }

      // Generate salt and hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create a new admin
      const newAdmin = await Admin.create({ name, username, hashedPassword });

      res
        .status(201)
        .json({ admin: newAdmin, message: 'Admin registered successfully' });
    } catch (error) {
      console.error('Error registering admin:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  loginAdmin: async (req, res, next) => {
    // Extract data from request body
    const { username, password } = req.body;

    try {
      // Find admin by username
      const admin = await Admin.findOne({ where: { username } });

      // Check if admin exists and password is correct
      if (!admin || !bcrypt.compareSync(password, admin.hashedPassword)) {
        return next(new AppError('Invalid credentials', 401));
      }

      // Generate a token upon successful authentication
      const token = jwt.sign(
        { username: admin.username, id: admin.id },
        process.env.SECRET_KEY,
        {
          expiresIn: '10d',
        }
      );

      res.json({ admin, token });
    } catch (error) {
      console.error('Error logging in admin:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  updateAdmin: async (req, res, next) => {
    // Extract data from request body
    const { username, name, newPassword } = req.body;
    const { admin } = req;

    try {
      // Verify the current password before allowing updates
      if (!bcrypt.compareSync(req.body.currentPassword, admin.hashedPassword)) {
        return next(new AppError('Current password is incorrect', 401));
      }

      // Update admin details
      admin.username = username || admin.username;
      admin.name = name || admin.name;

      // Update the password if a new one is provided
      if (newPassword) {
        admin.hashedPassword = bcrypt.hashSync(newPassword, 10);
      }
      // Check if admin with the same username already exists
      const existingAdmin = await Admin.findOne({ where: { username } });
      if (existingAdmin) {
        return next(new AppError('Username already in use', 400));
      }

      // Save the updated admin data
      await admin.save();

      res.json({ admin, message: 'Admin updated successfully' });
    } catch (error) {
      console.error('Error updating admin:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
  getAllAdmins: async (req, res, next) => {
    try {
      const admins = await Admin.findAll();
      res.json({ admins: admins });
    } catch (error) {
      console.error('Error fetching admins:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
  deleteAdminById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const admin = await Admin.findByPk(id);

      if (!admin) {
        return next(new AppError('admin not found', 404));
      }

      await admin.destroy();
      res.json({ message: 'admin deleted successfully' });
    } catch (error) {
      console.error('Error fetching admin:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
};

module.exports = adminController;
