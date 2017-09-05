"use strict";
let taskController = require('../controllers/taskController');

module.exports = (router) => {
  router.route('/tasks')
  .post((req, res) => {
    taskController.createTask(req.body)
    .then((result) =>{
      res.json({task: result, message: 'Task created successfully.'});
    })
    .catch((err) =>{
      res.status(400).send('Bad Request');
    });
  });
};
