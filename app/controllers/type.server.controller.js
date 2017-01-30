/**
 * Created by andh on 1/29/17.
 */
var Type = require('mongoose').model('Type');
var Content = require('mongoose').model('Content');
var Challenge = require('mongoose').model('Challenge');
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
exports.list = function(req,res){
    Type.find().exec(function (err,types) {
        if(err) return res.status(400).send();
        return res.json({data: types});
    })
};
exports.create = function(req,res){
    var type = new Type(req.body);
    type.save(function(err,type){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: type});
    })
};
exports.get = function(req,res){
    return res.json({data: req.type});
};
exports.update = function(req,res){
    req.type = Object.assign({},req.type,req.body);
    req.type.save(function(err,type){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: type});
    })
};
exports.remove = function(req,res){
    Content.find({type: req.type._id}).exec(function(err,contents){
        contents.forEach(function(content){
            content.remove();
        })
    });
    Challenge.update({types: req.type._id},{$pull: {"types":req.type._id}},{ multi: true }).exec(function(err,challenges){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        req.type.remove(function(err,type){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({data: type});
        });
    });
};
exports.typeByURL = function(req, res, next, id){
    Type.findById(id)
        .exec(function (err, type) {
            if (err) {
                return res.status(400).send();
            }
            if (!type) {
                return res.status(400).send({messages: ['Failed to load type ' + id]});
            }
            req.type = type;
            next();
        });
}