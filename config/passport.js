var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.serializeUser(function(id, done){
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function() {
                User.findOne({'local.email' : email}, function(err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (user) {
                        return done(null, false, req.flash('signUpMessage', 'That email has already been taken'));
                    }else{
                        var newUser = new User();
                        newUser.local.username = email;
                        newUser.local.password = password;

                        newUser.save(function(err){
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                })
                
            })
            
        }
    ));
}