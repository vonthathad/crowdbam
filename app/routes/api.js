/**
 * Created by andh on 1/28/17.
 */
var passport = require('passport');
module.exports = function (router) {
    router.use(passport.authenticate('bearer', {session: false}));
};