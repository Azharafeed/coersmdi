var express = require('express');
var router = express.Router();
const passport = require('passport')

const commentControler = require('../controlers/comment_controler');

router.post('/create',passport.checkAuthentication,commentControler.create);

module.exports = router;