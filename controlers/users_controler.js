const User = require('../model/user')


const bcrypt = require('bcrypt');

module.exports.profile = function(req,res){
    return res.render('profile')
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
       return res.redirect('/');
   });
}