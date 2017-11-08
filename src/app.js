let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let database = require('./utils/database');
let path = require('path');

let app = express();

let router = require('./routes');

//App use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
if(process.env.NODE_ENV != 'test'){
  app.use(logger('dev'));
}
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

module.exports = app;
