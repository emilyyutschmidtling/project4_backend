var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var debug = require('debug')('app:models');

var AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: {type: String, required: true },
  zip: { type: String }
});

var Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
