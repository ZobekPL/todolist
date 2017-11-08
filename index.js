"use strict";
let app = require('./src/app');
const port = require('./src/config').port;
let listener = app.listen(port);



module.exports = {
  listener,
  app
};
