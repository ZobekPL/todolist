let express = require('express');
let router = express.Router();

let taskRouter = require('./taskRouter');
taskRouter(router);


//Connection test
router.route('/')
.get((req, res) => {
  res.render('index', {title: 'TODO LIST'});
});

module.exports = router;
