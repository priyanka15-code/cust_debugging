const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
require('dotenv').config();
const { initRedisClient } = require('./utils/redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// IIFE to handle async code at the top level
(async () => {
  try {
    // Redis Initialization
    const redisClient = await initRedisClient();
    console.log('Redis client initialized');

    // Routes
    app.use('/api/users', userRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing Redis:', error);
  }
})();
