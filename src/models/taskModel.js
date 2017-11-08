let mongoose = require('mongoose');
let dbConnection = require('../utils/database');


let TaskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  isDone: {type: Boolean, default: false},
  date: {type: Date, default: Date.now()},
  isCreatedForTest: {type: Boolean, default: false}
});

let Task = dbConnection.model('Task', TaskSchema);
module.exports = Task;
