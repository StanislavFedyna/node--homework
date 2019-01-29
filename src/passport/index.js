const LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const {User, Task} = require('../model');


module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log(user);
        console.log('des');
        User.find({_id: user._id})
            .limit(1)
            .then((user) => {
            if(user.length === 0 ){
                return done('User not found', false); 
            }
            return done(null, user[0]);
           
        })
        .catch((err) => {
            console.error(err);
            return done(null, false, {'loginMessage': 'No user found.'}); // req.flash is the way to set flashdata using connect-flash
        })
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done){
        
        if(typeof username === 'undefined' || typeof password === 'undefined'){
            return done("Uncorrect password or username", null);
        }

        User.find({username: username})
            .limit(1)
            .then((user) => {
                user = user[0];
                if(user.length === 0 ){
                    return done(null, false);
                }

                if(bcrypt.compareSync(password, user.password)){
                    return done(null,{
                        username: user.username,
                        _id: user._id
                    })
                }
                return done("Uncorrect password or username", null);
            })
            .catch((err) => {
                console.error(err);
                return done("Smth wrong with server", null);
            })

    }));

    passport.use('local-register', new LocalStrategy(
       {
        usernameField: 'username',
        passwordField: 'password',
       }, function(username, password, done){
        
        if(typeof username === 'undefined' || typeof password === 'undefined'){
            console.log('error params');
            return done({status: 401, statusText: "Uncorrect password or username", data: null}, null);
        }
        User.find({username: username})
        .limit(1)
        .then((user) => {
            
            if(user.length !== 0 ){
                console.log('exist');
                return done('exist', null);
            }
            console.log(`pwd ${password}`);
            let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
            console.log(hash + '1');
            return(hash);
            
        }) 
        .then((hash) => {
            
            let user = new User({ 
                username: username,
                password: hash
            });
            
             user.save()
                .then((user) => {
                    return done(null, {status: 200, statusText: "Success", data: user});
                })
                .catch((err) => {
                    console.log(err);
                    return done({status: 500, statusText: "Smth wrong with server", data: null}, null);
                })
            
        })
        .catch((err) => {
            console.log(err);
            return done({status: 500, statusText: "Smth wrong with server", data: null}, null);
        })
    }))
};