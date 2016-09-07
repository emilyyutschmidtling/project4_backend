var Address = require('../models/address');

module.exports = {
  index: index,
  create: create,
  me: me,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  Address.find({}, function(err, addresses) {
    if (err) 
  })
}
