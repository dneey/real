var User = require('./models/user');
module.exports = function(app, passport) {


    app.get('/', function (req, res) {
        res.render('index');
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

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
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