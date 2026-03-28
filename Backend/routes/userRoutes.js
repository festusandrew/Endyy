const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/protect');

// All user admin routes require a valid JWT
router.get('/',     protect, getUsers);     // GET  /api/users
router.get('/:id',  protect, getUserById);  // GET  /api/users/:id
router.delete('/:id', protect, deleteUser); // DELETE /api/users/:id

module.exports = router;
