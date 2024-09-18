// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { initRedisClient } = require('../utils/redis'); 
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt'); 



// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST create a new user
router.post('/', async (req, res) => {
    const { sName, sEmail, sPassword, sAccess } = req.body;
  
    try {
      const existingUser = await User.findOne({ sEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(sPassword, 10);
  
      let developerId = null;
  
      // If sAccess is "Admin", generate unique developer ID using Redis
      if (sAccess === "Admin") {
        const redisClient = await initRedisClient();
        const firstLetter = sName.charAt(0).toUpperCase();
        let developerIdNumber = await redisClient.incr('developerId');
        developerIdNumber = developerIdNumber.toString().padStart(4, '0');
        const currentDate = new Date();
        const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
        developerId = `${firstLetter}${developerIdNumber}${dayOfMonth}`;
      }
      const newUser = new User({
        sName,
        sEmail,
        sPassword: hashedPassword,
        sAccess,
        developerId 
      });
      await newUser.save();
  
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // POST login
router.post('/login', async (req, res) => {
    const { sEmail, sPassword } = req.body;
  
    try {
      const user = await User.findOne({ sEmail });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(sPassword, user.sPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
        const token = generateToken(user, user.sAccess);
  
      return res.status(200).json({ 
        message: 'Login successful',
        token,
        user: {
          sName: user.sName,
          sEmail: user.sEmail,
          sAccess: user.sAccess
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;


