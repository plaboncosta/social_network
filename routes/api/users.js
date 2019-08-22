// Import Package
const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get Config Data
const config = require('../../config/default');

// Router
const router = express.Router();

// Model
const User = require('../../models/users');

// @route GET api/user/test
// @desc Register Route
// @access public
router.post('/', [
    check("name", "User Name is required").not().isEmpty(),
    check("email", "Please include your email").isEmail(),
    check("password", "Please Enter a minimum 8 digit password!").isLength({min: 8}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({errors: [{"msg": "User's already exists!"}]});
        }

        var avatar = gravatar.url(email,
            {
                s: '200',
                r: 'pg',
                d: 'mm'
            }, {protocol: 'https'});

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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