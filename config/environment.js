var _ = require('lodash');

var localEnvVars = {
  TITLE: 'Auth App',
  SAFE_TITLE: 'auth-app',
  TOKEN_SECRET: process.env.TOKEN_SECRET
};

// merges all environment variables into one object
module.exports = _.extend(process.env, localEnvVars);
