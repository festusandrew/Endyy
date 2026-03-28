const express = require('express');
const router = express.Router();
const { register, login, googleAuth, getMe, updateMe } = require('../controllers/authController');
const { protect } = require('../middleware/protect');

// Public routes
router.post('/register', register);   // POST /api/auth/register
router.post('/login',    login);      // POST /api/auth/login
router.post('/google',   googleAuth); // POST /api/auth/google

// Private routes (JWT required)
router.get('/me',  protect, getMe);    // GET  /api/auth/me
router.put('/me',  protect, updateMe); // PUT  /api/auth/me

module.exports = router;
