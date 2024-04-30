const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Contact = sequelize.define('Contact', {
  // ID field is usually automatically created by Sequelize
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const Property = sequelize.define('Property', {
  // ID field is usually automatically created by Sequelize
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyFor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyPage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertySection: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertySize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  propertyPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  propertyDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  propertyDescriptionFull: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  propertyLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Store base64-encoded images as an array of strings
  propertyPictures: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  // New column for storing admin information
  createdBy: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});
const Request = sequelize.define('Request', {
  // ID field is usually automatically created by Sequelize
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
module.exports = { Admin, Contact, Request, Property };
