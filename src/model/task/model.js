const mongoose = require('mongoose');
const { TaskSchema } = require('./schema');
const Task = mongoose.model('Tasks', TaskSchema);
module.exports = { Task };