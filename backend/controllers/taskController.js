let Task = require('../models/taskModel');

class taskController {
  createTask(taskBody){
    return new Promise((resolve, reject) => {
      let newTask = new Task(taskBody);
      newTask.save((error) => {
        if(error)
          reject({error: error});

        resolve(newTask);
      });
    });
  }

  getAllTasks(){
    return new Promise((resolve, reject) => {
      Task.find({}, (error, tasks) => {
        if(error)
          reject({error: error});

        if(tasks == null)
          resolve([]);

        resolve(tasks);
      });
    });
  }

  deleteTasksCreatedForTest(cb){
    Task.remove({ isCreatedForTest: true }, function (err) {
      if (err) return cb(err);
      return cb();
    });
  }
}

module.exports = new taskController();