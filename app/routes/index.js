var passport = require('passport');
var config = require('../configs/config');
var users = require('../controllers/user.server.controller');
var pa
/* GET home page. */
module.exports = function (app) {
  app.post('/auth/signup', users.authSignup);
  
/////////// LOCAL LOGIN
  app.post('/auth/signin',passport.authenticate('local'), users.authSignin);
  
/////////// LOGOUT
  app.get('/logout', users.authLogout);
  
/////////// FACEBOOK LOGIN
  app.get('/oauth/facebook', function (req, res, next) {
    req.session.redirect = req.query.redirect || '/';
    next();
  }, passport.authenticate('facebook', {scope: ['user_friends', 'email', 'public_profile']}));
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function (req, res) {
    res.redirect(req.session.redirect + "?token=" + req.user.token);
  });

  app.get('/', function (req, res, next) {
    res.render('index', {app: config.app});
  });

}