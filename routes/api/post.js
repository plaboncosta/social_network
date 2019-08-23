const express = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();

// Model
const Post = require('../../models/post');
const User = require('../../models/users');

//Controller
const PostController = require('../../controller/PostController');

// @route POST api/post
// @desc Add Post
// @access private
router.post('/', [auth,
    [
        check('text', 'Text Field is required!').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(res.user.id).select('-password');
        if (!user) return res.status(400).json({msg: 'User did not found!'});

        const {text} = req.body;
        const postFields = {
            user: res.user.id,
            text: text,
            name: user.name,
            avatar: user.avatar
        };

        // Create
        const post = await new Post(postFields);
        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
});


// @route GET api/post
// @desc Get Post
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const post = await Post.find({user: res.user.id}).sort({date: -1});
        return res.json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
});


// @route GET api/post/:post_id
// @desc Get Post By ID
// @access private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) return res.status(400).json({msg: 'Post did not found!'});

        // authorize user
        if(post.user.toString() !== res.user.id) {
            return res.status(401).json({msg: 'User is not authorized!'});
        }

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
});


// @route DELETE api/post/:post_id
// @desc Delete Post By ID
// @access private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) return res.status(400).json({msg: 'Post did not found!'});

        // authorize user
        if(post.user.toString() !== res.user.id) {
            return res.status(401).json({msg: 'User is not authorized!'});
        }

        post.remove();
        return res.status(200).json({msg: 'Post deleted Successfully!'});
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
});


// @route PUT api/post/like/:id
// @desc Like To Post
// @access private
router.put('/like/:id', auth, PostController.like);


// @route PUT api/post/unlike/:id
// @desc UnLike To Post
// @access private
router.put('/unlike/:id', auth, PostController.unLike);


// @route POST api/post/comment/:id
// @desc Comment To Post
// @access private
router.post('/comment/:id', [auth,[check('text', 'Text Field is required!').not().isEmpty()]], PostController.commentCreate);


// @route DELETE api/post/comment/:id/:comment_id
// @desc Delete Comment
// @access private
router.delete('/comment/:id/:comment_id', auth, PostController.commentDelete);

module.exports = router;