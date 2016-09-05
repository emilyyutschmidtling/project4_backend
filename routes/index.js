var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var usersCtrl = require('../controllers/users');

var token = require('../config/token_auth');

// users resource paths:
router.post('/users', usersCtrl.create);
router.get('/users/me', token.authenticate, usersCtrl.me);

// resource path for getting a token:
router.post('/token', token.create);

module.exports = router;
