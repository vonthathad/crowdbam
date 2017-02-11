/**
 * Created by andh on 1/29/17.
 */
var Challenge = require('mongoose').model('Challenge');
var Type = require('mongoose').model('Type');
var npp = 6;
var formidable = require('formidable');
var dir = 'sources/img';
var fs = require('fs');
var config = require('../configs/config');
var mkdirp = require('mkdirp');
var getErrorMessage = function(err) {
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
var getSortType = function(sortType) {
    if (sortType === "trending") {
        return { trending: -1 };
    }
    if (sortType === "popular") {
        return { popular: -1 };
    }
    return { created: -1 };
};
exports.hasAuthorization = function(req, res, next) {
    if (req.challenge.creator._id !== parseInt(req.user._id) && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages: ["You aren't Creator"]
        });
    }
    next();
};
exports.list = function(req, res) {
    var paging = parseInt(req.query.paging) || npp;
    console.log('paging', paging);
    var page = parseInt(req.query.page) || 1,
        skip = page > 0 ? ((page - 1) * paging) : 0;
    var conds = [];
    var match = {};
    conds.push({ public: true });
    if (req.query.category) conds.push({ categories: req.query.category });
    if (req.query.follow) conds.push({ follows: parseInt(req.query.follow) });
    if (req.query.recommendations && req.user._id){
        var cateList = [];
        req.user.recommendations.forEach(function (recommendation) {
            cateList.push({categories: recommendation});
        })
        if(cateList.length){
            conds.push({$or: cateList});
        }
    };
    if (req.query.user) conds.push({ creator: parseInt(req.query.user) });
    if (req.query.text) {
        conds.push({
            $or: [
                { title: { $regex: req.query.text, $options: 'i' } },
                { description: { $regex: req.query.text, $options: 'i' } }
            ]
        });
    }
    if (!conds.length) {
        match = {};
    } else if (conds.length == 1) {

        match = conds.pop();
    } else {
        match = { $and: conds };
    }
    console.log(match);
    var sortType = getSortType(req.query.order);
    Challenge.aggregate(
        [{
                $match: { $and: [{ created: { $lte: new Date() } }, match] }
            },
            {
                $project: {
                    popular: { $add: [{ $multiply: [{ $size: "$shares" }, 2] }, { $size: "$follows" }] },
                    trending: { $divide: [{ $add: [{ $multiply: [{ $size: "$shares" }, 2] }, { $size: "$follows" }] }, { $divide: [{ $subtract: [new Date(), "$created"] }, 3600000] }] },
                    created: 1,
                    title: 1,
                    description: 1,
                    prize: 1,
                    creator: 1,
                    types: 1,
                    thumb: 1,
                    url: 1,
                    follows: 1,
                    shares: 1,
                    categories: 1
                }
            },
            // Sorting pipeline
            { "$sort": sortType },
            { "$skip": skip },
            // Optionally limit results
            { "$limit": (paging + 1) }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } else {
                results = results.map(function(doc) {
                    return new Challenge(doc)
                });
                //res.json(results);
                Challenge.populate(results, { "path": "creator", "select": "displayName username avatar" }, function(err, data) {
                    if (err) return res.status(400).send();
                    console.log(JSON.stringify(data));
                    var isNext = false;
                    if (data.length == (paging + 1)) {
                        isNext = true;
                        data.pop();
                    }
                    resdata = {
                        data: data,
                        isNext: isNext
                    }
                    res.json(resdata);
                });

            }

        }
    );
};
exports.create = function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/../../public/uploaded/' + dir + '/';
    console.log(form.uploadDir);
    form.keepExtensions = true;
    form.maxFields = 1;
    form.maxFieldsSize = 4096;
    var count = 0;
    var content;
    form.on('progress', function(bytesReceived) {

        if (bytesReceived > 300000) {
            form._error();
            console.log('Loi nhan');
            return res.status(400).send();
        }
    });
    form.on('field', function(name, field) {
        // console.log("field \n" +field);
        if (name == 'content') {
            content = field;
            // console.log("content \n" + content);
        }
    });
    
    form.on('file', function(name, file) {
        console.log(file);
        count++;
        if ((file.type == 'image/jpeg' || file.type == 'image/png') && file.size < 300000 && count == 1) {
            var data = JSON.parse(content);
            var arrSplit = file.path.split('/');
            var name = arrSplit[arrSplit.length - 1];
            data.thumb = config.server.host + '/' + dir + '/' + name;
            data.creator = req.user._id;
            var challenge = new Challenge(data);
            console.log(challenge);
            challenge.save(function(err, challenge) {
                if (err) return res.status(400).send({ messages: getErrorMessage(err) });
                return res.json({ data: challenge });
            })
        } else {
            fs.unlink(file.path);
            console.log('loi dinh dang');
            return res.status(400).send();
        }
    });
    form.parse(req, function(err, fields, files) {});

};

function checkExists(dir, callback) {
    fs.exists(dir, function(exists) {
        if (!exists) {
            mkdirp(dir, function(err) {
                if (err) console.error(err);
                else {
                    console.log("The uploads folder was not present, we have created it for you [" + dir + "]");
                    callback();
                }
            });
            //throw new Error(dir + ' does not exists. Please create the folder');
        } else {
            callback();
        }
    });
}
exports.uploadImage = function(req, res) {
    var form = new formidable.IncomingForm();
    var cDir = 'challenge/' + req.challenge._id;
    var uploadDir = __dirname + '/../../public/uploaded/' + dir + '/' + cDir;


    form.uploadDir = uploadDir;
    console.log(form.uploadDir);
    form.keepExtensions = true;
    form.maxFields = 1;
    form.maxFieldsSize = 4096;

    var count = 0;
    checkExists(uploadDir, function() {
        form.parse(req, function(err, fields, files) {});
    });
    form.on('progress', function(bytesReceived) {

        if (bytesReceived > 300000) {
            form._error();
            console.log('Loi nhan');
            return res.status(400).send();
        }
    });
    form.on('file', function(name, file) {
        console.log(file);
        count++;
        if ((file.type == 'image/jpeg' || file.type == 'image/png') && file.size < 300000 && count == 1) {
            var arrSplit = file.path.split('/');
            var name = arrSplit[arrSplit.length - 1];
            return res.json({ link: config.server.host + '/' + dir + '/' + cDir + '/' + name });
        } else {
            fs.unlink(file.path);
            console.log('loi dinh dang');
            return res.status(400).send();
        }
    });


};
exports.get = function(req, res) {
    return res.json({ data: req.challenge });
};

exports.update = function(req, res) {

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

    req.body.public = false;
    req.body._id = req.challenge._id;
    req.body.creator = req.user._id;
    Challenge.findByIdAndUpdate(req.challenge._id, req.body).exec(function(err, challenge) {
        if (err) return res.status(400).send({ messages: getErrorMessage(err) });
        return res.json({ message: "Challenge's information has changed" });
    });
};
exports.review = function(req, res){
    req.challenge.review = true;
    req.challenge.save();
};
exports.remove = function(req, res) {
    req.challenge.types.forEach(function(e) {
        Type.findByIdAndRemove(e).exec();
    });
    req.challenge.remove(function(err, challenge) {
        if (err) return res.status(400).send({ messages: getErrorMessage(err) });
        return res.json({ data: challenge });
    });
};
exports.challengeByID = function(req, res, next, id) {
    Challenge.findById(id)
        .populate('creator', 'displayName username avatar')
        .populate('categories', 'title')
        .populate('types', 'title')
        .exec(function(err, challenge) {
            if (err) {
                return res.status(400).send();
            }
            if (!challenge) {
                return res.status(400).send({ messages: ['Failed to load challenge ' + id] });
            }
            req.challenge = challenge;
            next();
        });
}
exports.follow = function(req, res) {
    var isFollowed = false;
    req.challenge.follows.forEach(function(follow) {
        if (follow == req.user._id) isFollowed = true;
        return;
    });
    if (!isFollowed) {
        Challenge.findByIdAndUpdate(req.challenge._id, { $addToSet: { "follows": req.user._id } }).exec(function(err, success) {
            if (err) return res.status(400).send();
            return res.status(200).send({ data: { follow: true } });
        });
    } else {
        Challenge.findByIdAndUpdate(req.challenge._id, { $pull: { "follows": req.user._id } }).exec(function(err, success) {
            if (err) return res.status(400).send();
            return res.status(200).send({ data: { follow: false } });
        });
    }
};
exports.share = function(req, res) {
    Challenge.findByIdAndUpdate(req.challenge._id, { $addToSet: { "shares": req.user._id } }).exec(function(err, success) {
        if (err) return res.status(400).send();
        return res.status(200).send();
    });
};