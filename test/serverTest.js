process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;

let server = require('../');

let port = server.listener.address().port;


describe('Server', function(){
  it('should be running at port 3000', function(){
    assert.equal(port, 3000);
  });
});
