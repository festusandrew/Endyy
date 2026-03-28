const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/protect');

// Public — guest checkout is allowed; protect is optional
router.post('/', (req, res, next) => {
  // Try to attach user if token is present, but don't block if not
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.id).select('-password').then((user) => {
        if (user) req.user = user;
        next();
      });
    } catch {
      next(); // invalid token — proceed as guest
    }
  } else {
    next();
  }
}, createOrder);

// Private — must be logged in
router.get('/my',  protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
