"use strict";
let express = require('express');
let router = express.Router();

let taskRouter = require('./taskRouter');
taskRouter(router);


//Connection test
router.route('/')
.get((req, res) => {
  res.json({message: 'Hello world'});
});

module.exports = router;
