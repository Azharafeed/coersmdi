var express = require('express');
var router = express.Router();


const postControler = require('../controlers/posts_controler');

router.post('/create',postControler.create);

module.exports = router;
