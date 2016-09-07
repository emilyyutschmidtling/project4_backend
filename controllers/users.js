var User = require('../models/user');

module.exports = {
  index: index,
  create: create,
  me: me,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  User
  .find({})
  .then(function(users) {
    res.json({users: users})
  }).catch(function(err) {
    if(err) {
      res.json({message: 'Could not find any users'});
    }
  })
}

function create(req, res, next) {
  if(!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          userName: user.userName,
          email: user.email,
          id: user._id,
          createdAt: user._id.getTimestamp()
        }
      });
    }).catch(function(err) {
      if(err.message.match(/E11000/)) {
        err.status = 409;
      }
      else {
        err.status = 422;
      }
      next(err);
    });
};

function me(req, res, next) {
  User
    .findOne({userName: req.decoded.userName}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};

function update(req, res, next) {
  User
    .findOne({userName: req.decoded.userName}).exec()
    .then(function(user) {
      if(req.body.firstName) user.firstName = req.body.firstName;
      if(req.body.lastName) user.lastName = req.body.lastName;
      if(req.body.userName) user.userName = req.body.userName;
      if(req.body.email) user.email = req.body.email;
      if(req.body.password) user.password = req.body.password;
      user.save(function(err) {
        if(err) res.json({message: 'Could not update user because:' + err});
        console.log(user);
        user.updatedAt = Date.now;
        res.json({message: 'User successfuly updated', user: user});
      });
    });
}

function destroy(req, res, next) {
  User.findOne({email: req.decoded.email}).exec()
  .then(function(user) {
    user.remove(function(err) {
      if(err) res.json({message: 'Could not delete user because:' + err});
      res.json({message: 'User successfully deleted.'});
    });
  });
}
