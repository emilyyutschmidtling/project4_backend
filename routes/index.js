var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var usersCtrl = require('../controllers/users');

var token = require('../config/token_auth');

// users resource paths:
router.get('/users', usersCtrl.index);
router.post('/users', usersCtrl.create);
router.get('/users/me', token.authenticate, usersCtrl.me);
router.patch('/users/me', token.authenticate, usersCtrl.update);
router.delete('/users/me', token.authenticate, usersCtrl.destroy);

// resource path for getting a token:
router.post('/token', token.create);

// addresses resource paths:
// router.post('/addresses', addressesCtrl.create);

module.exports = router;
