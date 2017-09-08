"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let taskController = require('../controllers/taskController');
let server = require('../');

chai.use(chaiHttp);

describe('Router', function(){
  describe('index.js', function(){
    describe('/api', function(){
      describe('GET', function(){
        it('should be successfull', function(done){
          chai.request(server.app)
          .get('/api')
          .end(function(err, res){
            assert.typeOf(err, 'null');
            assert.equal(res.status, 200);
            done();
          });
        });

        it('should response hello world message', function(done){
          chai.request(server.app)
          .get('/api')
          .end(function(err, res){
            assert.deepEqual(res.body, { message: "Hello world"});
            done();
          });
        });
      });
    });
  });

  describe('taskRouter.js', function(){
    describe('/tasks', function(){
      describe('GET', function(){
        it('should be successfull', function(done){
          chai.request(server.app)
          .get('/api/tasks')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.typeOf(err, 'null');
            done();
          });
        });

        it('should response array of tasks and message', function(done){
          chai.request(server.app)
          .get('/api/tasks')
          .end(function(err, res){
            let message = res.body.message;
            let resultTasks = res.body.tasks;

            assert.isDefined(message);
            assert.isDefined(resultTasks);
            assert.typeOf(resultTasks, 'array');
            done();
          });
        });
      });

      describe('POST', function(){
        afterEach(function(){
          taskController.deleteTasksCreatedForTest()
          .catch(function(err){
            return err;
          });
        });

        it('should create be successfull', function(done){
          chai.request(server.app)
          .post('/api/tasks')
          .type('form')
          .send({
            title: 'Test task',
            isCreatedForTest: true
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.typeOf(err, 'null');
            done();
          });
        });

        it('should response new task', function(done){
          let expectedResult = {
            title: 'Test task',
            isCreatedForTest: true,
            isDone: false,
            date: Date.now()
          };

          chai.request(server.app)
          .post('/api/tasks')
          .type('form')
          .send({
            title: 'Test task',
            isCreatedForTest: true,
            date: expectedResult.date
          })
          .end(function(err, res){
            let message = res.body.message;
            let resultTask = res.body.task;

            assert.isDefined(message);
            assert.isObject(resultTask);

            assert.equal(resultTask.title, expectedResult.title);
            assert.equal(resultTask.isDone, expectedResult.isDone);
            assert.typeOf(new Date(resultTask.date), 'date');
            done();
          });
        });

        it('should respond with error if wrong input is given', function(done){
          let expectedResult = {
            title: 'Test task',
            isDone: false
          };

          chai.request(server.app)
          .post('/api/tasks')
          .type('form')
          .send({
            titleze: true,
            isCreatedForTest: true,
            date: 64*7+'adek'
          })
          .end(function(err, res){
            assert.isNotNull(err);
            assert.equal(res.status, 500);
            done();
          });
        });
      });
    });

    describe('/task/:id', function(){
      const TEST_TASK_ID = '59b165db7a4334169be016fe';
      describe('GET', function(){
        it('should be successfull', function(done){
          chai.request(server.app)
          .get('/api/task/59b165db7a4334169be016fe')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.typeOf(err, 'null');
            done();
          });
        });

        it('should response with task and message', function(done){
          chai.request(server.app)
          .get('/api/task/'+TEST_TASK_ID)
          .end(function(err, res){
            let message = res.body.message;
            let resultTask = res.body.task;

            assert.isDefined(message);
            assert.isDefined(resultTask);
            assert.typeOf(resultTask, 'object');
            done();
          });
        });
      });
      describe('PUT', function(){
        it('should be successfull', function(done){
          let dateNow = new Date();
          chai.request(server.app)
          .put('/api/task/'+TEST_TASK_ID)
          .type('form')
          .send({
            newTaskData: {
              date: dateNow
            }
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.typeOf(err, 'null');
            done();
          });
        });

        it('should response array of tasks and message', function(done){
          let dateNow = new Date();
          chai.request(server.app)
          .put('/api/task/'+TEST_TASK_ID)
          .type('form')
          .send({
            newTaskData:{
              date: dateNow
            }
          })
          .end(function(err, res){
            let message = res.body.message;
            let resultTask = res.body.task;
            let resultTaskDate = resultTask.date;

            assert.isDefined(message);
            assert.isDefined(resultTask);
            assert.typeOf(resultTask, 'object');
            assert.equal(new Date(resultTaskDate).getTime(), dateNow.getTime());
            done();
          });
        });
      });
    });
  });
});
