const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: mongoose.Schema.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = { UserSchema };