const mongoose = require('mongoose');
const { UserSchema } = require('./schema.js');
const User = mongoose.model('Users', UserSchema);
module.exports = { User };

 