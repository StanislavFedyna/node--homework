const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');


require('dotenv').load();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(express.static('public'));

// Session settiong
app.use(session({ 
    secret: 'saltsaltsalt', 
    cookie: { maxAge: (4 * 60 * 60 * 1000) },
    resave: true,
    saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

const Model = require('./src/model');
const { MongoManager } = require('./src/mongo');
const mongoManager = new MongoManager('mongodb://127.0.0.1:27017/NodeTest');

require('./src/passport')(passport, Model);

app.use('/', require('./src/routes')(Model));

app.use((err, req, res, next) => {
    if (err) {
        console.log('ERROR HANDLER', err);
        res.status(err.status || 500).json(err);
    }
});

mongoManager.connect();


module.exports = app;