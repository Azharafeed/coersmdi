const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function(req, res) {
    try {
        // Fetch posts and populate user and comments with users
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        // Fetch all users
        const users = await User.find({}).exec();

        // Render the home page with the fetched data
        return res.render('index', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        return res.status(500).send("Internal Server Error");
    }
}
