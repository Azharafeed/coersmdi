const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating a post:', err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        // Find the post by ID
        const post = await Post.findById(req.params.id);

        if (post) {
            // Check if the user is authorized to delete the post
            if (post.user.equals(req.user._id)) {
                // Remove the post using deleteOne
                await Post.deleteOne({ _id: req.params.id });

                // Delete all comments associated with the post
                await Comment.deleteMany({ post: req.params.id });

                return res.redirect('back');
            } else {
                // User not authorized to delete the post
                console.log('User not authorized to delete this post');
                return res.status(403).send('User not authorized to delete this post');
            }
        } else {
            // Post not found
            console.log('Post not found');
            return res.status(404).send('Post not found');
        }
    } catch (err) {
        console.log('Error in deleting the post:', err);
        return res.status(500).send('Internal Server Error');
    }
};
