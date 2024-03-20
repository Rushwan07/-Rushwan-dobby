const express = require('express');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes')
const userRoutes = require('./routes/user')
const path = require('path');
require('dotenv').config()

// Create an Express application
const app = express();
app.use(express.static('./'))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use('/images', express.static(path.join(__dirname, 'image')));

// Routes
app.use('/api/image', imageRoutes)
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
