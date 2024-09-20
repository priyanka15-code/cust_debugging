const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model'); 

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Environment variable JWT_SECRET is not defined.');
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Token verification error:', err);

    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    try {
      console.log('Decoded token:', decoded);
      req.user = await User.findById(decoded.userId); 
      req.devId = await User.findOne(decoded.developerId);
      if (!req.user) {
        console.error('User not found');
        return res.status(403).json({ message: 'User not authenticated' });
      }
      if (!req.devId) {
        console.error('Devloper not found');
        return res.status(403).json({ message: 'Devloper not authenticated' });
      }
      next();
    } catch (error) {
      console.error('Error in verifyToken:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};

module.exports = verifyToken;
