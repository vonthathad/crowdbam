/**
 * Created by andh on 1/28/17.
 */
var passport = require('passport');
var users = require('../controllers/user.server.controller');
var categories = require('../controllers/category.server.controller');
var contents = require('../controllers/content.server.controller');
var challenges = require('../controllers/challenge.server.controller');
var solutions = require('../controllers/solution.server.controller');
var comments = require('../controllers/comment.server.controller');
var types = require('../controllers/type.server.controller');
var timelines = require('../controllers/timeline.server.controller');
module.exports = function (router) {
    router.use(passport.authenticate('bearer', {session: false}));
    
    /* TOKEN */
    router.get('/token', users.authToken);
    
    /* CHALLENGE */
    router.route('/challenges')
        .get(challenges.list)
        .post(users.requiresLogin,challenges.create);
    router.route('/challenges/:challengeID')
        .get(challenges.get)
        .put(users.requiresLogin,challenges.hasAuthorization,challenges.update)
        .delete(users.requiresLogin,challenges.hasAuthorization,challenges.remove);
    router.route('/challenges/:challengeID/follow')
        .put(users.requiresLogin,challenges.follow);
    router.route('/challenges/:challengeID/share')
        .put(users.requiresLogin,challenges.share);
    router.route('/challenges/:challengeID/image')
        .post(users.requiresLogin,challenges.hasAuthorization,challenges.uploadImage);
    router.param('challengeID', challenges.challengeByID);
    
    /* CATEGORY */
    router.route('/categories')
        .get(categories.list)
        .post(users.requiresManager,categories.create);
    router.route('/categories/:categoryURL')
        .get(categories.get)
        .put(users.requiresManager,categories.update)
        .delete(users.requiresManager,categories.remove);
    router.param('categoryURL', categories.categoryByURL);

    /* TYPE */
    router.route('/types')
        .get(types.list)
        .post(users.requiresManager,types.create);
    router.route('/types/:typeURL')
        .get(types.get)
        .put(users.requiresManager,types.update)
        .delete(users.requiresManager,types.remove);
    router.param('typeURL', types.typeByURL);

    /* CONTENT */
    router.route('/contents/:challengeID/:typeURL')
        .post(users.requiresLogin,contents.hasAuthorization,contents.create)
        .get(contents.get)
        .put(users.requiresLogin,contents.hasAuthorization,contents.update)
        .delete(users.requiresLogin,contents.hasAuthorization,contents.remove);
    
    /* SOLUTION */
    router.route('/solutions')
        .get(solutions.list)
        .post(users.requiresLogin,solutions.create);
    router.route('/solutions/:solutionID')
        .get(solutions.get)
        .put(users.requiresLogin,solutions.hasAuthorization,solutions.update)
        .delete(users.requiresLogin,solutions.hasAuthorization,solutions.remove);
    router.param('solutionID', solutions.solutionByID);
    
    /* COMMENT */
    router.route('/comments')
        .get(comments.list)
        .post(users.requiresLogin,comments.create);
    router.route('/comments/:commentID')
        .put(users.requiresLogin,comments.hasAuthorization,comments.update)
        .delete(users.requiresLogin,comments.hasAuthorization,comments.remove);
    router.route('/comments/:commentID/vote')
        .put(users.requiresLogin,comments.vote);
    router.param('commentID', comments.commentByID);
    
    /* TIMELINE */
    router.route('/timelines')
        .get(timelines.checkChallengeExist,timelines.list)
        .post(users.requiresLogin,solutions.create);
    router.route('/solutions/:timelineID')
        .put(users.requiresLogin,timelines.checkChallengeExist,timelines.hasAuthorization,timelines.update)
        .delete(users.requiresLogin,timelines.checkChallengeExist,timelines.hasAuthorization,timelines.remove);
    router.param('timelineID', timelines.timelineByID);
};
