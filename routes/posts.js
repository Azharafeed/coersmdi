var express = require('express');
var router = express.Router();
const passport = require('passport')

const postControler = require('../controlers/posts_controler');

router.post('/create',passport.checkAuthentication,postControler.create);

module.exports = router;
