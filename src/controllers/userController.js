// faculty-management/controllers/userController.js
const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        // req.user.id is set by the authMiddleware from the JWT token
        const user = await User.findById(req.user.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update current user's profile
// @route   PUT /api/users/me
// @access  Private
exports.updateMe = async (req, res) => {
    // Destructure fields that can be updated from the request body
    const { name, mobile, dateOfBirth, department, designation, address } = req.body;

    // Build an object with only the fields that were provided in the request
    const userFields = {};
    if (name) userFields.name = name;
    if (mobile) userFields.mobile = mobile;
    if (dateOfBirth) userFields.dateOfBirth = dateOfBirth;
    if (department) userFields.department = department;
    if (designation) userFields.designation = designation;
    if (address) userFields.address = address;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Use findByIdAndUpdate to update the user
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields }, // $set operator updates only the specified fields
            { new: true, runValidators: true } // 'new: true' returns the updated document, 'runValidators' ensures schema validations run
        ).select('-password'); // Exclude password from the returned object

        res.json(user);
    } catch (err) {
        console.error(err.message);
        // Handle specific validation errors if needed
        if (err.kind === 'ObjectId') { // Example for invalid ID format (less likely here as ID comes from token)
            return res.status(400).json({ msg: 'User ID invalid' });
        }
        res.status(500).send('Server Error');
    }
};