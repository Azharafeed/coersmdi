const Post = require('../model/post');

module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).exec();
        return res.render('index', { posts: posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching posts' });
    }
};
