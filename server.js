var express = require('express');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('app:http');

// require('dotenv').config();
require('dotenv').load({silent: true});


var env = require('./config/environment')

var mongoose = require('./config/database');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('title', process.env.TITLE);
app.set('safe-title', process.env.SAFE_TITLE);

app.locals.title = app.get('title');

// CORS to allow separate client like Postman to send requests
app.use(allowCors);
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(debugReq);
app.use(express.static(path.join(__dirname, 'public')));

app.use(validateContentType);

app.use('/api', routes);
// app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(addFailedAuthHeader);
app.use(function(err, req, res, next) {
  err = (app.get('env') === 'development') ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:', req.query);
  debug('body:', req.body);
  next();
}

function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
}

function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST'];
  if (
    methods.indexOf(req.method) !== -1 &&
    Object.keys(req.body).length !== 0 &&
    !req.is('json')) {
      var message = 'Content-Type header must be application/json.';
      res.status(400).json(message);
    }
  else {
    next();
  }
}

function addFailedAuthHeader(err, req, res, next) {
  var header = {'WWW-Authenticate': 'Bearer'};
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ' realm="${err.realm}"';
    res.set(header);
  }
  next(err);
}

// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
