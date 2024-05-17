const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.create = async function(req, res) {
    try {
        // Find the post by ID
        const post = await Post.findById(req.body.post);

        if (post) {
            // Create the comment
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Add the comment to the post's comments array
            post.comments.push(comment);
            await post.save();

            return res.redirect('/');
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while creating the comment' });
    }
}

