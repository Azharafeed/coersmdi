var express = require('express');
var router = express.Router();
const passport = require('passport')

const postControler = require('../controlers/posts_controler');

router.post('/create',passport.checkAuthentication,postControler.create);
router.get('/destroy/:id',passport.checkAuthentication,postControler.destroy)

module.exports = router;
