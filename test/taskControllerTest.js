let chai = require('chai');
let chaiAsP = require('chai-as-promised');
let assert = chai.assert;

let taskController = require('../controllers/taskController');


chai.use(chaiAsP);

describe('TaskController', function(){
  describe('createTask()', function(){
    afterEach(function(){
      taskController.deleteTasksCreatedForTest(function(err){
        if(err)
          return err;
      });
    });

    it('should return new task', function(){
      let taskBody = {
          title: 'Test task',
          isCreatedForTest: true
      };
      let expectedResult = {
        title: 'Test task',
        isDone: false
      };
      let newTask = taskController.createTask(taskBody);

      return assert.isFulfilled(newTask).then(function(result){
        let resultTask = result.task;
        assert.isObject(resultTask);

        assert.equal(resultTask.title, expectedResult.title);
        assert.equal(resultTask.isDone, expectedResult.isDone);
        assert.typeOf(resultTask.date, 'date');
      });
    });
  });

  describe('updateTask()', function(){
    it('should return updated task', function(){
      const TEST_TASK_ID = '59b165ed7a4334169be01700';

      let dateNow = new Date();
      let updateTask = taskController.updateTask(TEST_TASK_ID, {date: dateNow});

      return assert.isFulfilled(updateTask).then(function(result){
        let resultTask = result.task;
        let taskDate = resultTask.date;

        assert.typeOf(resultTask, 'object');
        assert.equal(dateNow, taskDate);
      });
    });
  });

  describe('deleteTask()', function(){
    let testingTaskId;

    beforeEach(function(done){
        taskController.createTask({title: 'testtest'})
        .then(function(result){
          let taskId = result.task._id;
          testingTaskId = taskId;
          done();
        });
    });

    it('should delete task based on given id', function(){
      let deleteTask = taskController.deleteTask(testingTaskId);

      return assert.isFulfilled(deleteTask).then(function(result){
        let deletedTaskId = result.taskId;

        assert.equal(deletedTaskId, testingTaskId);
      });
    });

    it('should delete task from db', function(){
      let deleteTask = taskController.deleteTask(testingTaskId);

      return assert.isFulfilled(deleteTask).then(function(result){
        let getDeletedTaskById = taskController.getTaskById(result.taskId);

        return assert.isRejected(getDeletedTaskById).then(function(result){
          assert.isNotNull(result.error);
          assert.equal(result.status, 404);
        });
      });
    });
  });

  describe('getAllTasks()', function(){
    it('should return array of tasks', function(){
      let getTasks = taskController.getAllTasks();

      return assert.isFulfilled(getTasks).then(function(result){
        let resultTasks = result.tasks;
        assert.typeOf(resultTasks, 'array');
      });
    });
  });
});
