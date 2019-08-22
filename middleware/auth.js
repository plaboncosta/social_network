const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({msg: 'No token found, authorization denied!'});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        res.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({msg: 'Token is invalid!'});
    }
};