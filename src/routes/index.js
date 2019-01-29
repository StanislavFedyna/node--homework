const routes = require('express').Router();
const passport = require('passport');
const isLogIn = require('../middlewares/index').isLogIn;

const auth = require('./auth');
const task = require('./task');

module.exports = function(model){
    routes.get('/', (req, res) => {
        res.send('hello');
    })

    routes.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    routes.use('/auth', auth(model));
    routes.use('/task', isLogIn, task(model));
    
    routes.all('*', (req, res) => {
        res.send('404');
    });

    return routes;
}
