let mongoose = require('mongoose');
let config = require('../config').database;
mongoose.Promise = global.Promise; //Mongoose deprecation solution - set promise engine to javascript's default one

const dbUrl = config.uri;

let dbConnection = mongoose.connect(dbUrl, {
  useMongoClient: true
});

module.exports = dbConnection;
