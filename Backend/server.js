const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const requestRoutes = require('./routes/requestRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const { errorHandler } = require('./utils/error');
const { testDbConnection } = require('./config/database');

const app = express();

app.use(bodyParser.json());

// Middleware for Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Logging Middleware (optional)
const morgan = require('morgan');
app.use(morgan('dev'));

// Load environment variables
require('dotenv').config();

// Connect to the database
testDbConnection();

// Admin Routes
app.use('/admin', adminRoutes);
// contact Routes
app.use('/contact', contactRoutes);
// property Routes
app.use('/property', propertyRoutes);
// request Routes
app.use('/request', requestRoutes);
// Images Routes
app.use('/images', imagesRoutes);

// Ping endpoint
app.get('/', (req, res) => {
  res.status(200).send('Server is up and running!');
});

// Applying the errorHandler middleware
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
