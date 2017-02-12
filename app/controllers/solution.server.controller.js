/**
 * Created by andh on 1/29/17.
 */
var Solution = require('mongoose').model('Solution');
var npp = 10;
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
    if (req.solution.creator._id !== parseInt(req.user._id) && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages : ["You aren't Creator"]
        });
    } else {
        next();
    }
};
exports.list = function(req,res) {
    var paging = parseInt(req.query.paging) || npp;
    var page = parseInt(req.query.page) || 1,
        skip = page > 0 ? ((page - 1) * paging) : 0;
    if (req.query.challenge) {
        Solution.find({challenge: req.query.challenge})
            .sort('-created')
            .limit(paging + 1)
            .skip(skip)
            .exec(function (err, solutions) {
                if (err) return res.status(400).send();
                var isNext = false;
                if(solutions.length==(paging+1)){
                    isNext = true;
                    data.pop();
                };
                resdata = {
                    data: data,
                    isNext: isNext
                };
                return res.json(resdata);
            });
    } else {
        return res.status(400).send({
            messages: ["Must have a challenge"]
        });
    }
};

exports.create = function(req,res){
    if (req.body.challenge) {
        req.body.creator = req.user._id;
        var solution = new Solution(req.body);
        solution.save(function(err,solution){
            if(err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({data: solution});
        })
    } else {
        return res.status(400).send({
            messages: ["Must have a challenge"]
        });
    }
};
exports.get = function(req,res){
    return res.json({data: req.solution});
};
exports.update = function(req,res){
    var obj = {};
    if(req.body.title) obj.title = req.body.title;
    if(req.body.description) obj.description = req.body.description;
    if(req.body.html) obj.html = req.body.html;
    obj.modified =  Date.now();
    Solution.findByIdAndUpdate(req.solution._id,obj,function(err,solution){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({message: "Solution's information has changed"});
    });
};
exports.remove = function(req,res){
    req.solution.remove(function(err,solution){
        if(err) return res.status(400).send({messages: getErrorMessage(err)});
        return res.json({data: solution});
    });
};

exports.solutionByID = function(req, res, next, id){
    Solution.findById(id)
        .exec(function (err, solution) {
            if (err) {
                return res.status(400).send();
            }
            if (!solution) {
                return res.status(400).send({messages: ['Failed to load solution ' + id]});
            }
            req.solution = solution;
            next();
        });
}