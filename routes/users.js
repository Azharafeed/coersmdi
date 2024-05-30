var express = require('express');
var router = express.Router();
const passport = require('passport')
const usersControler = require('../controlers/users_controler')
/* GET users listing. */
router.get('/profile/:id',passport.checkAuthentication,usersControler.profile);
router.get('/signup', usersControler.signup);
router.get('/signin', usersControler.signin);

router.post('/create', usersControler.create);
router.post('/createSession', passport.authenticate(
  'local',
  {failureRedirect:'/users/signin'},
),usersControler.createSession);

router.get('/sign-out',usersControler.destroySession)
module.exports = router;

module.exports = router;
