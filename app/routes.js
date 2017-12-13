var User = require('./models/user');
module.exports = function(app) {


    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/signup', function (req, res) {
        res.render('signup', {message : 'Victory'});
    });

    app.post('/signup', function (req, res) {
        var newUser = new User();
        newUser.local.username = req.body.email;
        newUser.local.password = req.body.password;
        console.log(newUser.local.username + "  " + newUser.local.password);
        newUser.save(function (err) {
            if (err)
                throw err;
            res.redirect('/');
        });
    });
    

    app.get('/login', function(req, res){
        res.render('login', {message : 'login-message'});
    });

    app.post('/login', function(req, res){
        var user = User.findOne()
        res.render('login', {message : 'login-message'});
    });
    


}