var User = require('./models/user');
module.exports = function(app, passport) {


    app.get('/', isLoggedOut, function (req, res) {
        res.render('index', {message: req.flash('logout-message')});
    });

    app.get('/profile', isLoggedIn, function(req, res){
        console.log(req.user);
        res.render('profile', {message: req.flash('signup-message'), user : req.user.local});
    });
    
    app.get('/login', function(req, res) {
        res.render('login', {message: req.flash('login-message')});
    });

    app.get('/signup', function (req, res) {
        res.render('signup', {message : req.flash('signup-message')});
    });

    app.get('/home', isLoggedIn, function(req, res) {
        console.log('user' + ' ' +req.user.local.email);
        res.render('home', {message: req.flash('signup-message'), user: req.user.local});
    });

    /**
     * Passport js implementations
     */
    
    app.post('/signup', passport.authenticate('local-signup', {
         successRedirect: '/home',
         failureRedirect: '/signup',
         failureFlash: true,
         successFlash: true
    }));

    app.post('/login',  passport.authenticate('local-login',{
         successRedirect: '/home',
         failureRedirect: '/login',
         failureFlash: true,
         successFlash: true
    }));

    app.get('/logout', function(req, res){
        req.logout();
        req.flash('logout-message', 'You have been logged out.');
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true,
            successFlash: true
        }));

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
    function isLoggedOut(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/home');
        }
































    /*          NON PASSPORT IMPLEMENTATION             */
    
    // app.post('/signup', function (req, res) {
    //     var newUser = new User();
    //     newUser.local.username = req.body.email;
    //     newUser.local.password = req.body.password;
    //     console.log(newUser.local.username + "  " + newUser.local.password);
    //     newUser.save(function (err) {
    //         if (err)
    //             throw err;
    //         res.redirect('/');
    //     });
    // });
    

    // app.get('/login', function(req, res){
    //     res.render('login', {message : 'login-message'});
    // });

    // app.post('/login', function(req, res){
    //     var user = User.findOne()
    //     res.render('login', {message : 'login-message'});
    // });
    


}