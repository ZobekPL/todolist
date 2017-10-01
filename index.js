"use strict";
let app = require('./app');
const port = 3000;
let port2;
let listener = app.listen(port);



module.exports = {
  listener,
  app
};
