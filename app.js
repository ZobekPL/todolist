let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let database = require('./src/utils/database');
let path = require('path');
var exphbs  = require('express-handlebars');

let app = express();
const port = require('./src/config').port;

let router = require('./src/routes');

//App use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
if(process.env.NODE_ENV != 'test'){
  app.use(logger('dev'));
}
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', router);

let listener = app.listen(port);

module.exports = {
  listener,
  app
};
