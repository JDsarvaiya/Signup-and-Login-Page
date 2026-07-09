var express = require('express');
var router = express.Router();
var SIGNUPDATA = require('../module/signup')
var userController = require('../controller/user')

router.post('/signup', userController.Signup);
router.post('/login', userController.Login);

module.exports = router;