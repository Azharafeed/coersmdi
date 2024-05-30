const User = require('../model/user')


const bcrypt = require('bcrypt');


module.exports.profile = async function(req, res) {
    try {
        // Find user by ID
        const user = await User.findById(req.params.id).exec();

        // Render the user profile page with the fetched user data
        return res.render('profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).send("Internal Server Error");
    }
}



module.exports.signup = function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup')
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return  res.redirect('/users/profile')
    }
    return res.render('signin')
}



module.exports.create = async function(req,res){
    try{   //fetch the data
       const {email,password,conform_password} = req.body;
       if(password != conform_password){
           return res.redirect('back')
       };
       const existuser = await User.findOne({email})
       if(existuser){
           return res.redirect('back')
         }
       if(!existuser){
         await User.create(req.body);
         return res.redirect('/users/signin')
       }
    }
    catch(err){
       return res.redirect('/')

    }

}

module.exports.createSession = async function(req,res){
  return res.redirect('/users/profile');
}
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            // Handle error if any
            console.error(err);
        }
        // Redirect to the 'index' page
        return res.redirect('/');
    });
};
