/**
 * Created by andh on 1/29/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId,
    config = require('../configs/config.js'),
    connection = mongoose.createConnection(config.database);
var CommentSchema = new Schema({
    challenge: {
        type: Number,
        ref: 'Challenge',
        required: 'Challenge cannot be blank',
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    },
    content: {
        type: String,
        required: 'Content cannot be blank',
        trim: true,
        maxlength: 140
    },
    creator: {
        type: Number,
        ref: 'User'
    },
    votes: [{
        type: Number,
        ref: 'User'
    }]
});
mongoose.model('Comment', CommentSchema);