const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
require('dotenv').config();
const { initRedisClient } = require('./utils/redis');

const app = express();
const PORT = process.env.PORT ;
app.use(cors({
  origin: process.env.ORIGIN
}));
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

(async () => {
  try {
    // Redis Initialization
    const redisClient = await initRedisClient();
    console.log('Redis client initialized');

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/product',productRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing Redis:', error);
  }
})();
