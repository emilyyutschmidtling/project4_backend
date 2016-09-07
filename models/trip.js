var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var debug = require('debug')('app:models');

var TripSchema = new mongoose.Schema({
  start: String,
  destination: String,
  createdBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {type: Date, default: Date.now}
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
