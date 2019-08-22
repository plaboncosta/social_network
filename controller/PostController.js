// Import Package
const {check, validationResult} = require('express-validator');

// Model
var Post = require('../models/post');
var User = require('../models/users');


// Like
exports.like = async (req, res) => {
    try {
        post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({msg: 'Post did not found!'});

        // Check if the post already been liked
        const checkLike = post.likes.filter(like => like.user.toString() === res.user.id).length > 0;
        if (checkLike) return res.status(400).json({msg: 'Post already liked!'});

        post.likes.unshift({user: res.user.id});
        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
};

// Unlike
exports.unLike = async (req, res) => {
    try {
        post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({msg: 'Post did not found!'});

        // Check if the post if not liked
        const checkLike = post.likes.filter(like => like.user.toString() === res.user.id).length === 0;
        if (checkLike) {
            return res.status(400).json({msg: 'Post does not liked yet!'});
        }

        // Get RemoveIndex
        const removeIndex = post.likes.map(like => like.user).indexOf(res.user.id);
        if (removeIndex === -1) return res.status(400).json({msg: 'Post does not liked yet!'});

        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
};

// Create Comment
exports.commentCreate = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(res.user.id).select('-password');
        if (!user) return res.status(400).json({msg: 'User did not found!'});

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({msg: 'Post did not found!'});

        const {text} = req.body;
        const commentFields = {
            user: res.user.id,
            text: text,
            name: user.name,
            avatar: user.avatar
        };

        // Create
        post.comments.unshift(commentFields);
        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
};

// Delete Comment
exports.commentDelete = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({msg: 'Post did not found!'});

        // Pull out Comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment) return res.json({msg: 'Comment did not found!'});

        // Authorize User
        if(comment.user.toString() !== res.user.id) {
            return res.json({msg: 'User is not authorized!'});
        }

        removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        await post.save();

        return res.json({msg: 'Comment Deleted SuccessFully'});
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Post did not found!'});
        }
        return res.status(500).json({msg: 'Server Error!'});
    }
};
