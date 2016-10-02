var Trip = require('../models/trip');

module.exports = {
  index: index,
  create: create,
  me: me,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  Trip.find({}, function(err, trips) {
    if (err) next(err);
    res.json(trips);
  })
}
