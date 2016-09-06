var _ = require('lodash');

var localEnvVars = {
  TITLE: 'CARbon Footprints',
  SAFE_TITLE: 'carbon-footprints',
  TOKEN_SECRET: process.env.TOKEN_SECRET
};

// merges all environment variables into one object
module.exports = _.extend(process.env, localEnvVars);
