let Task = require('../models/taskModel');

class taskController {
  createTask(taskBody){
    return new Promise((resolve, reject) => {
      let newTask = new Task(taskBody);
      newTask.save((error) => {
        if(error)
          reject({error: error, status: 500});

        resolve({task: newTask});
      });
    });
  }

  getAllTasks(){
    return new Promise((resolve, reject) => {
      Task.find({}, (error, tasks) => {
        if(error)
          reject({error: error, status: 500});

        if(tasks == null)
          resolve({tasks: []});

        resolve({tasks: tasks});
      });
    });
  }

  getTaskById(taskId){
    return new Promise((resolve, reject) => {
      Task.findById(taskId, (error, task) => {
        if(error)
          reject({error: error, status: 500});

        if(task == null)
          reject({error: new Error('Task not found'), status: 404});

        resolve({task: task});
      });
    });
  }

  deleteTasksCreatedForTest(){
    return new Promise((resolve, reject) => {
      Task.remove({ isCreatedForTest: true }, function (error) {
        if(error)
          reject({error: error, status: 500});

        resolve({message: 'Removed successfully.'});
      });
    });
  }
}

module.exports = new taskController();
