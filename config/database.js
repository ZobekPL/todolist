let mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Mongoose deprecation solution - set promise engine to javascript's default one

const dbUrl = 'mongodb://root:root@ds038319.mlab.com:38319/todolist';

let dbConnection = mongoose.connect(dbUrl, {
  useMongoClient: true
});

module.exports = dbConnection;
