"use strict";
let express = require('express');
let router = express.Router();

//Connection test
router.route('/')
.get((req, res) => {
  res.json({message: 'Hello world'});
});

module.exports = router;
