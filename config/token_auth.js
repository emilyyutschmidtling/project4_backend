var jwt = require('jsonwebtoken');

var User = require('../models/user');

module.exports = {
  create: create,
  refresh: refresh,
  authenticate: authenticate
};

// ================================
// TOKEN STRUCTURE
// ================================

function extractPayload(user, options) {
  return {
    email: user.email,
    userName: user.userName,
    use: 'public_api'
  }
}

var jwtOptions = {
  algorithm: 'HS256',
  expiresIn: '7days'
}

// =================================
// API
// =================================

function create(req, res, next) {
  if(!req.body.email || !req.body.password) {
    var message = 'Missing required fields: email and password';
    return res.status(422).json(message);
  }
  User
    .findOne({email: req.body.email}).exec()
    .then(function(user) {
      if(!user || !user.verifyPasswordSync(req.body.password)) {
        var message = 'User not found or password incorrect';
        return res.status(403).json(message);
      }
      var token = generateJwt(user);
      res.json(token);
    });
}

function refresh(req, res, next) {
  User
    .findById(req.decoded._id).exec()
    .then(function(user) {
      var token = generateJwt(user);
      res.json(token);
    });
}

function authenticate(req, res, next) {
  var token = findTokenInAuthHeader(req);
  if (!token) return next({status: 401, message: 'Authenticate with token.'});
  verifyJwtAndHandleErrors(token, next, function(decoded) {
    req.decoded = decoded;
    next();
  });
}

// ================================
// Helpers
// ================================

function generateJwt(user, options) {
  return jwt.sign(
    extractPayload(user, options),
    process.env.TOKEN_SECRET,
    jwtOptions
  );
}

function findTokenInAuthHeader(req) {
  var token;
  var header = req.get('Authorization');
  if (!header) header = req.get('Authorisation');
  if (header) {
    var match = header.match(/(bearer|token) (.*)/i);
    token = match ? match[2] : match;
  }
  if (!token) {
    token = req.query.token;
  }
  return token;
}

function verifyJwtAndHandleErrors(token, next, cb) {
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err && err.name === 'TokenExpiredError') {
      next({
        status: 401,
        message: 'Authorization failed (invalid_token): token expired.'
      });
    }
    else if (err) {
      next({
        status: 401,
        message: 'Authorization failed (invalid_token): token malformed.'
      });
    }
    else {
      cb(decoded);
    }
  });
}
