var express = require('express');
var router = express.Router();
const homeControler = require('../controlers/home_controler')
/* GET home page. */
router.get('/',homeControler.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));

module.exports = router;
