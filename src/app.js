// faculty-management/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON requests
app.use(cors()); // Enable CORS for all origins (consider restricting in production)

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

// Define Routes
app.use('/api/auth', require('./routes/authRoutes')); // For login/register
app.use('/api/users', require('./routes/userRoutes')); // <--- NEW: For user profile routes

// Basic Route for testing server
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));