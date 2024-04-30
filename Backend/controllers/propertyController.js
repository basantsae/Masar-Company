// propertyController.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Property } = require('../models/AllModels');
const { AppError } = require('../utils/error');
const { Op } = require('sequelize');

const propertyController = {
  createProperty: async (req, res, next) => {
    try {
      // Extract data from request body
      const {
        propertyType,
        propertyFor,
        propertyPage,
        propertySection,
        propertySize,
        propertyPrice,
        propertyDescription,
        propertyDescriptionFull,
        propertyLocation,
        bedrooms,
        bathrooms,
      } = req.body;
      const { admin } = req;

      // Parse numeric values
      const parsedPropertySize = parseInt(propertySize, 10);
      const parsedPropertyPrice = parseInt(propertyPrice, 10);
      const parsedBedrooms = parseInt(bedrooms, 10);
      const parsedBathrooms = parseInt(bathrooms, 10);

      // Extract image files from request
      const images = req.files;

      const imageNames = images.map(async (image) => {
        // Use the fs.promises.readFile to read the file contents
        const imageBuffer = await fs.promises.readFile(image.path);
        const uniqueFileName = uuidv4() + path.extname(image.originalname);
        const imagePath = path.join(__dirname, '..', 'images', uniqueFileName);
        await fs.promises.writeFile(imagePath, imageBuffer);

        // Delete the original temporary image file
        await fs.promises.unlink(image.path);
        return uniqueFileName;
      });

      const imageNamesArray = await Promise.all(imageNames);

      // Create the property with image names
      const newProperty = await Property.create({
        propertyType,
        propertyFor,
        propertyPage,
        propertySection,
        propertySize: parsedPropertySize,
        propertyPrice: parsedPropertyPrice,
        propertyDescription,
        propertyDescriptionFull,
        propertyLocation,
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        propertyPictures: imageNamesArray,
        createdBy: { name: admin.name, username: admin.username },
      });

      res.status(201).json({
        property: newProperty,
        message: 'Property created successfully',
      });
    } catch (error) {
      console.error('Error creating property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  getAllProperties: async (req, res, next) => {
    try {
      const properties = await Property.findAll({ order: [['id', 'DESC']] });
      res.json({ properties: properties });
    } catch (error) {
      console.error('Error fetching properties:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  getPropertyById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const property = await Property.findByPk(id);

      if (!property) {
        return next(new AppError('Property not found', 404));
      }

      res.json({ property: property });
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  deletePropertyById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const property = await Property.findByPk(id);

      if (!property) {
        return next(new AppError('Property not found', 404));
      }

      // Extract image names before deleting the property
      const imageNames = property.propertyPictures;

      await property.destroy();

      // Delete images from the filesystem
      await Promise.all(
        imageNames.map(async (imageName) => {
          const imagePath = path.join(__dirname, '..', 'images', imageName);
          try {
            await fs.promises.unlink(imagePath);
          } catch (error) {
            console.error('Error deleting image:', error);
            // Handle errors appropriately (e.g., log the error, send a notification)
          }
        })
      );

      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },

  searchProperties: async (req, res, next) => {
    try {
      const {
        propertyType,
        propertyPage,
        propertySection,
        propertyLocation,
        minBedrooms,
        maxBedrooms,
        minPrice,
        maxPrice,
        propertyFor,
      } = req.query;

      // Build the search criteria
      const searchCriteria = {
        propertyType:
          propertyType !== undefined ? propertyType : { [Op.not]: null },
        propertyPage:
          propertyPage !== undefined ? propertyPage : { [Op.not]: null },
        propertySection:
          propertySection !== undefined ? propertySection : { [Op.not]: null },
        propertyLocation:
          propertyLocation !== undefined
            ? propertyLocation
            : { [Op.not]: null },
        bedrooms: {
          [Op.gte]: minBedrooms !== undefined ? parseInt(minBedrooms, 10) : 0,
          [Op.lte]:
            maxBedrooms !== undefined ? parseInt(maxBedrooms, 10) : 9999, // Use a high value if no max is provided
        },
        propertyPrice: {
          [Op.gte]: minPrice !== undefined ? parseInt(minPrice, 10) : 0,
          [Op.lte]: maxPrice !== undefined ? parseInt(maxPrice, 10) : 999999999, // Use a high value if no max is provided
        },
        propertyFor:
          propertyFor !== undefined ? propertyFor : { [Op.not]: null }, // Add propertyFor to the search criteria
      };

      const properties = await Property.findAll({
        where: searchCriteria,
      });
      res.json({ properties: properties });
    } catch (error) {
      console.error('Error searching properties:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
  editProperty: async (req, res, next) => {
    const { id } = req.params;
    try {
      const property = await Property.findByPk(id);

      if (!property) {
        return next(new AppError('Property not found', 404));
      }

      // Extract existing image names
      const existingImageNames = property.propertyPictures;

      // Update property values with new ones from request body
      const {
        propertyType,
        propertyFor,
        propertyPage,
        propertySection,
        propertySize,
        propertyPrice,
        propertyDescription,
        propertyDescriptionFull,
        propertyLocation,
        bedrooms,
        bathrooms,
        propertyPictures: newPropertyPictures, // Updated propertyPictures array as a string
      } = req.body;

      // Parse the propertyPictures string into an array
      const newPropertyPicturesArray = newPropertyPictures.split(',');

      // Update numeric values
      property.propertyType = propertyType;
      property.propertyFor = propertyFor;
      property.propertyPage = propertyPage;
      property.propertySection = propertySection;
      property.propertySize = parseInt(propertySize, 10);
      property.propertyPrice = parseInt(propertyPrice, 10);
      property.propertyDescription = propertyDescription;
      property.propertyDescriptionFull = propertyDescriptionFull;
      property.propertyLocation = propertyLocation;
      property.bedrooms = parseInt(bedrooms, 10);
      property.bathrooms = parseInt(bathrooms, 10);

      // Delete missing images
      const missingImages = existingImageNames.filter(
        (imageName) => !newPropertyPicturesArray.includes(imageName)
      );

      for (const imageName of missingImages) {
        const imagePath = path.join(__dirname, '..', 'images', imageName);
        try {
          await fs.promises.unlink(imagePath);
          console.log(`Deleted image: ${imageName}`);
        } catch (error) {
          console.error(`Error deleting image ${imageName}:`, error);
        }
      }
      // Add new images
      const submittedImages = req.files;

      if (submittedImages && submittedImages.length > 0) {
        const imageNames = submittedImages.map(async (image) => {
          // Use the fs.promises.readFile to read the file contents
          const imageBuffer = await fs.promises.readFile(image.path);
          const uniqueFileName = uuidv4() + path.extname(image.originalname);
          const imagePath = path.join(
            __dirname,
            '..',
            'images',
            uniqueFileName
          );
          await fs.promises.writeFile(imagePath, imageBuffer);

          // Delete the original temporary image file
          await fs.promises.unlink(image.path);
          return uniqueFileName;
        });

        const imageNamesArray = await Promise.all(imageNames);
        // Update property with new and existing image names
        property.propertyPictures = [
          ...newPropertyPicturesArray,
          ...imageNamesArray,
        ];
      } else {
        // If no new images submitted, update property with existing image names
        property.propertyPictures = newPropertyPicturesArray;
      }

      // Save the updated property
      await property.save();

      res.json({ message: 'Property updated successfully', property });
    } catch (error) {
      console.error('Error updating property:', error);
      next(new AppError('Internal Server Error', 500));
    }
  },
};

module.exports = propertyController;
