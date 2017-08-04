"use strict";
let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let database = require('./config/database');

let app = express();

let router = require('./routes');

//App use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
if(process.env.NODE_ENV != 'test'){
  app.use(logger('dev'));
}

app.use('/api', router);

module.exports = app;
