// faculty-management/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = decoded.user; // req.user now contains { id: userId, role: userRole }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};