const auth = require('express').Router();
const passport = require('passport');

module.exports = function({User}){

    auth.post('/signin', function(req, res, next){
        passport.authenticate('local-login', function(err, user){
            if(err){
                return res.send('err');
            }
            if(!user){
                return res.status(401).json({status: 401, textMsg: 'Не авториований', data: null});
            }   

            req.login(user, function(err) {
                if (err) { 
                    return next(err);
                }
                return res.status(200).json(user);
            });
                
            })(req, res, next)
    });

    auth.post('/signup', function(req, res, next){
      
        passport.authenticate('local-register', function(err, user){
            console.log(err, user);
            if(err){
                
                return res.status(500).json({status: 500, textMsg: 'Error', data: err});
            }

            if(!user){
               
                return res.status(401).json({status: 401, textMsg: 'User error', data: user});
            }
            return res.status(200).json(user);
            })(req, res, next) 
        })
     

    return auth;
}
