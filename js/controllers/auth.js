// ===============================================
// ================ Dependancies =================
// ===============================================
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


// ===============================================
// ================ Verify User ==================
// ===============================================
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if(err)
      	return done(err);

      if(!user) 
      	return done(null, false, { message: 'Incorrect username.' });

      user.verifyPassword(password, function(err, isMatch) {
        if(err)
        	return done(err);

        if(!isMatch) 
        	return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      });
    });
  }
));


// ===============================================
// ============== Session Handling ===============
// ===============================================
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// ===============================================
// ============== Authentification ===============
// ===============================================
module.exports = {
  login: passport.authenticate('local'),
  isAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
          next();
      }else{
          res.status(401).send({success: false, message: 'Session not valid'});
      }
  }
};