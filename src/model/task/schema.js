const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  text: {
    type: String,
    required: true
  },
  status: Boolean
});

module.exports = { TaskSchema };
