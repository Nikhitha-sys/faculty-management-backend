// faculty-management/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Import your auth middleware
const userController = require('../controllers/userController'); // Import the new controller

// @route   GET api/users/me
// @desc    Get current logged in user's profile
// @access  Private
router.get('/me', auth, userController.getMe);

// @route   PUT api/users/me
// @desc    Update current logged in user's profile
// @access  Private
router.put('/me', auth, userController.updateMe);

module.exports = router;