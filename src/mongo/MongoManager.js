const mongoose = require('mongoose');

class MongoManager {
  constructor (url) {
    this._url = url;
  }
  getMongoUrl(){
    console.log(this._url);
    return this._url;
  }
  connect () {
    return mongoose.connect(this.getMongoUrl(), { useNewUrlParser: true });
  }
}

module.exports = { MongoManager }; 