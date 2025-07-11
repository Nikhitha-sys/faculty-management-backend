// src/utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

// Function to sign a JWT and return it
const getSignedJwtToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

module.exports = getSignedJwtToken;