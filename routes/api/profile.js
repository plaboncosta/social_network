// Import Package
const express = require('express');
const request = require('request');
const {check, validationResult} = require('express-validator');

// Middleware
const auth = require('../../middleware/auth');

// Model
const Profile = require('../../models/profile');
const User = require('../../models/users');
const Post = require('../../models/post');

// Router
const router = express.Router();

// Config
const config = require('../../config/default');


// @route GET api/profile/me
// @desc User Profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: res.user.id}).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'There is no user for this profile!'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!');
    }
});

// @route GET api/profile
// @desc All Profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        if (!profiles) return res.status(400).json({msg: 'There is no profile!'});

        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!');
    }
});

// @route POST api/profile
// @desc Create Or Update User Profile
// @access Private
router.post('/', [auth,
    [
        check('status', 'Status Field is required!').not().isEmpty(),
        check('skills', 'Skills Field is required!').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = res.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build Social Object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user: res.user.id});

        if(profile) {
            // Update
            profile = await Profile.findOneAndUpdate({user: res.user.id}, {$set: profileFields}, {new: true});

            return res.json(profile);
        }

        // Create
        profile = await new Profile(profileFields);
        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
});

// @route GET api/profile/:id
// @desc User Profile Data By Id
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({msg: 'User Profile Not Found!'});

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'User Profile Not Found!'});
        }

        return res.status(500).send('Server Error!');
    }
});

// @route DELETE api/profile/delete/:user_id
// @desc User Profile Delete
// @access Private
router.delete('/delete', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: res.user.id});
        if (!profile) return res.status(400).send('Profile Not Found!');
        profile.remove();

        const posts = await Post.deleteMany({user: res.user.id});
        if (!posts) res.status(400).send('Posts Not Found!');

        const user = await User.findOne({_id: res.user.id});
        if (!user) return res.status(400).send('User Not Found!');
        user.remove();

        return res.json({msg: 'User Deleted Successfully'});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
    }
});

// @route PUT api/profile/experience
// @desc Add Profile Experiences
// @access Private
router.put('/experience', [auth,
    [
        check('title', 'Title Field is required').not().isEmpty(),
        check('company', 'Company Field is required').not().isEmpty(),
        check('from', 'From Date Field is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: res.user.id});
        profile.experiences.unshift(newExperience);
        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
    }
});


// @route DELETE api/profile/experience/exp_id
// @desc Delete Profile Experiences
// @access Private
router.delete('/experience/delete/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: res.user.id});

        // Get remove index
        const removeIndex = profile.experiences.map(item => item.id).indexOf(req.params.exp_id);
        if (removeIndex == -1) return res.status(400).json({msg: 'Experience did not found!'});
        profile.experiences.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!');
    }
});


// @route PUT api/profile/education
// @desc Add Profile Education
// @access Private
router.put('/education', [auth,
    [
        check('school', 'School Field is required').not().isEmpty(),
        check('degree', 'Degree Field is required').not().isEmpty(),
        check('fieldofstudy', 'Fieldofstudy Field is required').not().isEmpty(),
        check('from', 'From Date Field is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: res.user.id});
        profile.education.unshift(newEducation);
        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
    }
});


// @route DELETE api/profile/education/edu_id
// @desc Delete Profile Education
// @access Private
router.delete('/education/delete/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: res.user.id});

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        if (removeIndex == -1) return res.status(400).json({msg: 'Education did not found!'});
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!');
    }
});


// @route GET api/profile/github/:username
// @desc Get Github repository
// @access Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.githubClientId}&client_secret=${config.githubClientSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if(response.statusCode !== 200) return res.status(404).json({msg: 'No Github Profile Found!'});

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error!');
    }
});

module.exports = router;