// faculty-management/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['faculty', 'admin'], // Add other roles if needed
        default: 'faculty'
    },
    // --- NEW PROFILE FIELDS ---
    facultyId: { // Unique ID for faculty member, as seen in your video
        type: String,
        unique: true,
        sparse: true // Allows null values but enforces uniqueness for non-null ones
    },
    mobile: { // Mobile number
        type: String
    },
    dateOfBirth: { // Date of Birth
        type: Date
    },
    department: { // Example from common faculty profiles
        type: String
    },
    designation: { // Example from common faculty profiles
        type: String
    },
    address: { // Example from common faculty profiles
        type: String
    },
    // You can add more fields as per your frontend's profile display
    // e.g., qualifications: [String], researchInterests: [String],
    //       profilePicture: String (URL to image storage)
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('User', UserSchema);