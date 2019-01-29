
exports.isLogIn = function(req, res, next){
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated()){
            return next();
        }
            
        // if they aren't redirect them to the home page
        res.status(401).json({
            'status': 401,
            'statusText': 'Access denied',
            'data': null
        });
}