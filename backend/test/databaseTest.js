"use strict";

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiAsP = require('chai-as-promised');
let assert = chai.assert;

let mongoose = require('mongoose');
let dbConnection = require('../config/database');

const DB_CONNECTED = 1; //0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

chai.use(chaiAsP);

describe('Database', function(){
  it('should be connected', function(){
    return assert.isFulfilled(dbConnection).then(function(){
      assert.equal(mongoose.connection.readyState, DB_CONNECTED); 
    });
  });
});
