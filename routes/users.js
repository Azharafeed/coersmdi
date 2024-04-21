var express = require('express');
var router = express.Router();
const usersControler = require('../controlers/users_controler')
/* GET users listing. */
router.get('/profile', usersControler.profile);
router.get('/signup', usersControler.signup);
router.get('/signin', usersControler.signin);



module.exports = router;
