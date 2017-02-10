/**
 * Created by andh on 1/29/17.
 */
var Timeline = require('mongoose').model('Timeline');
var Challenge = require('mongoose').model('Challenge');
var getErrorMessage = function (err) {
    console.log(err);
    var messages = [];
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                messages = ['ID is exist'];
                break;
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) messages.push(err.errors[errName].message);
        }
    }
    return messages;
};
exports.checkChallengeExist  = function(req,res,next){
    Challenge.findById(req.query.challenge).exec(function(err,challenge){
        if(err) return res.status(400).send();
        if(!challenge) return res.status(400).send({
            messages: ["Challenge isn't exist"]
        });
        req.challenge = challenge;
        next();
    });
}
exports.hasAuthorization = function(req, res, next) {
    if (req.challenge.creator !== req.user._id && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages : ["You aren't Creator"]
        });
    } else {
        next();
    }
};
exports.list = function(req,res) {
    Timeline.find({challenge: req.challenge._id})
    .sort('deadline')
    .exec(function (err, timelines) {
        if (err) return res.status(400).send();
        return res.json({data: timelines});
    });
};

exports.create = function(req,res){
    if (req.body.challenge) {

        var timeline = new Timeline(req.body);
        timeline.save(function(err,timeline){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({data: timeline});
        })
    } else {
        return res.status(400).send({
            messages: ["Must have a challenge"]
        });
    }
};
exports.update = function(req,res){
    Timeline.findByIdAndUpdate(req.timeline._id,{html: req.body.html,modified: Date.now() },function(err,timeline){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({message: "Timeline's information has changed"});
    });
};
exports.remove = function(req,res){
    req.timeline.remove(function(err,timeline){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: timeline});
    });
};

exports.timelineByID = function(req, res, next, id){
    Timeline.findById(id)
        .exec(function (err, timeline) {
            if (err) {
                return res.status(400).send();
            }
            if (!timeline) {
                return res.status(400).send({messages: ['Failed to load timeline ' + id]});
            }
            req.timeline = timeline;
            next();
        });
}