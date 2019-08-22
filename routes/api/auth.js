// Import Package
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware
const auth = require('../../middleware/auth');

// Model
const User = require('../../models/users');

// Config
const config = require('../../config/default');

// @route Get api/auth
// @desc  Authentication route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(res.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'})
    }
});

// @route Get api/auth
// @desc  Login route
// @access Public
router.post('/', [
    check("email", "Please include your email").isEmail(),
    check("password", "Please include your password!").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors: [{"msg": "Invalid credentials!"}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{"msg": "Invalid credentials!"}]});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            config.jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                /*const decoded = jwt.decode(token, {complete: true});
                console.log(decoded.payload);*/
                res.json({token})
            }
        );

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }

});

module.exports = router;