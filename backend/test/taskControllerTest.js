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

  describe('getAllTasks()', function(){
    it('should return array of tasks', function(){
      let getTasks = taskController.getAllTasks();

      return assert.isFulfilled(getTasks).then(function(result){
        let resultTasks = result.tasks;
        assert.typeOf(resultTask, 'array');
      });
    });
  });
});
