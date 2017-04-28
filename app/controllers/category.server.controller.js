/**
 * Created by andh on 1/29/17.
 */
var Category = require('mongoose').model('Category');
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
    Category.find().exec(function (err,categories) {
        if(err) return res.status(400).send();
        return res.json({data: categories});
    });
};
exports.create = function(req,res){
    var category = new Category(req.body);
    category.save(function(err,category){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: category});
    })
};
exports.get = function(req,res){
    return res.json({data: req.category});
};
exports.update = function(req,res){
    Category.findByIdAndUpdate(req.category._id,req.body,function(err,category){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({message: "Category's information has changed"});
    });
};
exports.remove = function(req,res){
    console.log(req.category);
    Challenge.update({categories: req.category._id},{$pull: {"categories":req.category._id}},{ multi: true }).exec(function(err,challenges){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        req.category.remove(function(err,category){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({data: category});
        });
    });
};
exports.categoryByURL = function(req, res, next, id){
    Category.findById(id)
        .exec(function (err, category) {
            if (err) {
                return res.status(400).send();
            }
            if (!category) {
                return res.status(400).send({messages: ['Failed to load category ' + id]});
            }
            req.category = category;
            next();
        });
}