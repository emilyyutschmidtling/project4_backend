var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var debug = require('debug')('app:models');

var TripSchema = new mongoose.Schema({
  start: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }],
  destination: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }],
  createdBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
