var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var debug = require('debug')('app:models')

var UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {type: Date, default: Date.now},
  updatedAt: Date,
  admin: Boolean,
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }]
});

// add hashing to model (works on the password field)
UserSchema.plugin(require('mongoose-bcrypt'));

// a transformation in the toJson function that stops the password field from being returned in any response
UserSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
