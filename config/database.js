var mongoose = require('mongoose');

var env = require('./environment')

// tells app that database will either be online (on the MLAB MongoDB server) or local
var dbUri = env.MONGODB_URI ||
            'mongodb://localhost/' + env.SAFE_TITLE;
            // 'mongodb://localhost/' + process.env.LOCAL_DB;

// if not using the database on the MLAB MongoDB server, make sure mongod is on so the local database is accessible
if(!env.MONGODB_URI) {
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}

if(!mongoose.connection._hasOpened) {
  mongoose.connect(dbUri)
};

module.exports = mongoose;
