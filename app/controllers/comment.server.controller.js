/**
 * Created by andh on 1/29/17.
 */
var Comment = require('mongoose').model('Comment');
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
exports.hasAuthorization = function (req, res, next) {
   if (req.comment.creator._id !== parseInt(req.user._id) && req.user.role !== 'admin' && req.user.role !== 'manager') {
      return res.status(403).send({
         messages: ["You aren't Creator"]
      });
   } else {
      next();
   }
};
exports.list = function (req, res) {
   var paging = parseInt(req.query.paging) || npp;
   var page = parseInt(req.query.page) || 1,
      skip = page > 0 ? ((page - 1) * paging) : 0;
   if (req.query.challenge) {
      Comment.find({challenge: req.query.challenge})
         .sort('-created')
         .limit(paging + 1)
         .populate('creator', 'avatar displayName username')
         .skip(skip)
         .exec(function (err, comments) {
            if (err) return res.status(400).send();
            var isNext = false;
            if (comments.length == (paging + 1)) {
               isNext = true;
               comments.pop();
            }
            ;
            resdata = {
               data: comments,
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
exports.create = function (req, res) {
   req.body.creator = req.user._id;
   if (req.body.challenge) {
      var comment = new Comment(req.body);
      comment.save(function (err, comment) {
         if (err) return res.status(400).send({messages: getErrorMessage(err)});
         Comment.findById(comment._id).populate('creator','displayName avatar username')
             .exec(function(err,data){
                if (err) return res.status(400).send({messages: getErrorMessage(err)});
                return res.json({data: data});
             });
         // tmp = {
         //    content: comment.content,
         //    created: comment.created,
         //    creator: {
         //       _id: req.user._id,
         //       avatar: req.user.avatar,
         //       displayName: req.user.displayName,
         //       username: req.user.username
         //    }
         // };


      });
   } else if (req.body.comment) {
      Comment.findById(req.body.comment, function (err, data) {
         if (err || !data || !data.challenge) return res.status(400).send();
         req.body.challenge = data.challenge;
         var comment = new Comment(req.body);
         comment.save(function (err, comment) {
            var tmp = {};
            tmp = {
               content: comment.content,
               created: comment.created,
               creator: {
                  _id: req.user._id,
                  avatar: req.user.avatar,
                  displayName: req.user.displayName,
                  username: req.user.username
               }
            }
            if (err) return res.status(400).send({messages: getErrorMessage(err)});
            return res.json({data: tmp});
         });
      });
   } else {
      return res.status(400).send({
         messages: ["Must have a challenge or comment"]
      });
   }
};
exports.update = function (req, res) {
   Comment.findByIdAndUpdate(req.comment._id, {
      content: req.body.content,
      modified: Date.now()
   }, function (err, comment) {
      if (err) return res.status(400).send({messages: getErrorMessage(err)});
      return res.json({message: "Comment's information has changed"});
   });
};
exports.remove = function (req, res) {
   req.comment.remove(function (err, comment) {
      if (err) return res.status(400).send({messages: getErrorMessage(err)});
      return res.json({data: comment});
   });
};
exports.vote = function (req, res) {
   var isVoted = false;
   req.comment.votes.forEach(function (vote) {
      if (vote == req.user._id) isVoted = true;
      return;
   });
   if (!isVoted) {
      Comment.findByIdAndUpdate(req.comment._id, {$addToSet: {"votes": req.user._id}}).exec(function (err, success) {
         if (err) return res.status(400).send();
         return res.status(200).send({data: {vote: true}});
      });
   } else {
      Comment.findByIdAndUpdate(req.comment._id, {$pull: {"votes": req.user._id}}).exec(function (err, success) {
         if (err) return res.status(400).send();
         return res.status(200).send({data: {vote: false}});
      });
   }
};
exports.commentByID = function (req, res, next, id) {
   Comment.findById(id)
      .exec(function (err, comment) {
         if (err) {
            return res.status(400).send();
         }
         if (!comment) {
            return res.status(400).send({messages: ['Failed to load comment ' + id]});
         }
         req.comment = comment;
         next();
      });
}