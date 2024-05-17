
const Post = require('../model/post');
const User = require('../model/user');
const Comment = require('../model/comment')


module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).populate('user').exec();
        return res.render('index', {
            posts: posts
            
        });
        const comment = await Comment.find({}).populate('user').exec();
        return res.render('index', {
            comment: comment
            
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching posts' });
    }
}
