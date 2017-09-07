"use strict";
let taskController = require('../controllers/taskController');

module.exports = (router) => {
  router.route('/tasks')
  .get((req, res) => {
    taskController.getAllTasks()
    .then((result) =>{
      res.json({tasks: result.tasks, message: 'Task loaded successfully.'});
    })
    .catch((err) =>{
      res.status(err.status).send(err.error);
    });
  })
  .post((req, res) => {
    taskController.createTask(req.body)
    .then((result) =>{
      res.json({task: result.task, message: 'Task created successfully.'});
    })
    .catch((err) =>{
      res.status(err.status).send(err.error);
    });
  });
};
