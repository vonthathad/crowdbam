var passport = require('passport');
var config = require('../configs/config');
var users = require('../controllers/user.server.controller');
var pa
/* GET home page. */
module.exports = function (app) {
  app.post('/auth/signup', users.authSignup);
  app.route('/action/verify/:token')
      .get(users.verifyEmail);
  app.route('/action/verify')
      .post(users.resendVerificationEmail);
  app.route('/action/reset/:token')
      .get(users.resetPage);
  app.route('/action/reset')
      .post(users.resetPassword);
  app.route('/action/password/:token')
      //.get(users.renderReset)
      .get(users.renderPassword)
      .post(users.resetDone);
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
    res.render('index', {message: null, app: config.app, channel: config.server.channel});
  });

}