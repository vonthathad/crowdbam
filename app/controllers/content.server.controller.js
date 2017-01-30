/**
 * Created by andh on 1/29/17.
 */
var Content = require('mongoose').model('Content');
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
exports.hasAuthorization = function(req, res, next) {
    if (req.challenge.creator._id !== parseInt(req.user._id) && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages : ["You aren't Creator"]
        });
    } else {
        Content.findOne({challenge: req.challenge._id, type: req.type._id},function(err,content){
            if(err) return res.status(400).send();
            if(!content) return res.status(400).send({
                messages : ["This content isn't exist"]
            });
            req.content = content;
            next();
        });
    }
};

exports.create = function(req,res){
    if(req.content){
        return res.status(400).send({
            messages : ["This content is exist"]
        });
    } else {
        req.body.challenge = req.challenge._id;
        req.body.type = req.type._id;
        var content = new Content(req.body);
        content.save(function(err,content){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            Challenge.findByIdAndUpdate(req.challenge._id, { $addToSet: { "types": req.type._id } }).exec();
            return res.json({data: content});
        })
    }

};
exports.get = function(req,res){
    return res.json({data: req.content});
};
exports.update = function(req,res){
    if(req.content){
        Content.findByIdAndUpdate(req.content._id,{html: req.body.html,modified: Date.now() },function(err,content){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({message: "Content's information has changed"});
        });
    } else {
        return res.status(400).send({
            messages : ["This content isn't exist"]
        });
    }

};
exports.remove = function(req,res){
    if(req.content){
        Challenge.findByIdAndUpdate(req.content.challenge,{$pull: {"types":req.content.type}}).exec(function(err,challenge){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            req.content.remove(function(err,content){
                if(err) return res.status(400).send({messages: getErrorMessage(err)});
                return res.json({data: content});
            });
        });
    } else {
        return res.status(400).send({
            messages : ["This content isn't exist"]
        });
    }

};
