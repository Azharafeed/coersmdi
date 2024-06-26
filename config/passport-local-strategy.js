const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');

// authentication using passport
passport.use (new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password, done){
        try {
            // find a user and establish the identity
            const user = await User.findOne({email: email});
            if (!user || user.password !== password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try {
        let user = await User.findById(id);
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
       res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
