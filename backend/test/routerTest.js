"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let server = require('../');

chai.use(chaiHttp);

describe('Router', function(){
  describe('index.js', function(){
    describe('/api', function(){
      it('should be successfull', function(){
        chai.request(server.app)
        .get('/api')
        .end(function(err, res){
          assert.typeOf(err, 'null');
          assert.equal(res.status, 200);
        });
      });

      it('should response hello world message', function(){
        chai.request(server.app)
        .get('/api')
        .end(function(err, res){
          assert.deepEqual(res.body, { message: "Hello World"});
        });
      });
    });
  });
});
