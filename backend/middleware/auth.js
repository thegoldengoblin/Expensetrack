import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user and attach to request
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
      
      next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      res.status(401).json({ error: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'No authentication token' });
  }
};

export default protect;