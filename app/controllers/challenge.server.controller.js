/**
 * Created by andh on 1/29/17.
 */
var Challenge = require('mongoose').model('Challenge');
var Type = require('mongoose').model('Type');
var getErrorMessage = function (err) {
    console.log(err);
    var messages = [];
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                messages = ['URL is exist'];
                break;
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) messages.push(err.errors[errName].message);
        }
    }
    return messages;
};
exports.hasAuthorization = function(req, res, next) {
    if (req.challenge.creator._id !== parseInt(req.user._id) && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages : ["You aren't Creator"]
        });
    }
    next();
};
exports.list = function(req,res){
    Challenge.find().exec(function (err,challenges) {
        if(err) return res.status(400).send();
        return res.json({data: challenges});
    });
};
exports.create = function(req,res){
    req.body.creator = req.user._id;
    var challenge = new Challenge(req.body);
    console.log(challenge);
    challenge.save(function(err,challenge){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: challenge});
    })
};
exports.get = function(req,res){
    return res.json({data: req.challenge});
};
exports.update = function(req,res){

    // if(req.body.url){
    //     Challenge.findOne({url: req.body.url}).exec(function(err,challenge){
    //         if(err) return res.status(400).send({messages: ['An error occur. Please try again later']});
    //         if(challenge) res.status(400).send({messages: ['URL has exist']})
    //         req.body.public = req.challenge.public;
    //         req.body._id = req.challenge._id;
    //         req.body.creator = req.user._id;
    //         Challenge.findByIdAndUpdate(req.challenge._id,req.body).exec(function(err,challenge){
    //             if(err) return res.status(400).send({messages: getErrorMessage(err)});
    //             return res.json({message: "Challenge's information has changed"});
    //         });
    //     })
    // } else {
    //     req.body.public = req.challenge.public;
    //     req.body._id = req.challenge._id;
    //     req.body.creator = req.user._id;
    //     Challenge.findByIdAndUpdate(req.challenge._id,req.body).exec(function(err,challenge){
    //         if(err) return res.status(400).send({messages: getErrorMessage(err)});
    //         return res.json({message: "Challenge's information has changed"});
    //     });
    // }

    req.body.public = req.challenge.public;
    req.body._id = req.challenge._id;
    req.body.creator = req.user._id;
    Challenge.findByIdAndUpdate(req.challenge._id,req.body).exec(function(err,challenge){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({message: "Challenge's information has changed"});
    });
};
exports.remove = function(req,res){
    req.challenge.types.forEach(function(e){
       Type.findByIdAndRemove(e).exec();
    });
    req.challenge.remove(function(err,challenge){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: challenge});
    });
};
exports.challengeByID = function(req, res, next, id){
    Challenge.findById(id)
        .populate('creator', 'displayName username avatar')
        .populate('categories', 'title')
        .populate('types','title')
        .exec(function (err, challenge) {
            if (err) {
                return res.status(400).send({messages: getErrorMessage(err)});
            }
            if (!challenge) {
                return res.status(400).send({messages: ['Failed to load challenge ' + id]});
            }
            req.challenge = challenge;
            next();
        });
}