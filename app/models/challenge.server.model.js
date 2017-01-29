/**
 * Created by andh on 1/29/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../configs/config.js'),
    connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);
// var random = require('mongoose-simple-random');
var ChallengeSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title of challenge is required',
        maxlength: 36
    },
    description: {
        type: String,
        trim: true,
        maxlength: 140
    },
    thumb: {
        type: String,
        trim: true,
        required: 'Thumb of challenge is required'
    },
    url: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[A-Za-z_.-]{3,20}$/, "Please fill a valid challenge's url"]
    },
    category: {
        type: Number,
        ref: 'Category',
        required: 'Category of challenge is required'
    },
    shares: [{
        type: Number,
        ref: 'User',
        default: []
    }],
    follows: [{
        type: Number,
        ref: 'User',
        default: []
    }],
    top: Number,
    hot: Number,
    created: {
        type: Date,
        default: Date.now
    },
    prize: Number,
    creator: {
        type: Number,
        ref: 'User',
        default: []
    },
    types: [{
        type: Number,
        ref: 'Type',
        default: []
    }],
    public: {
        type: Boolean,
        default: false
    }
});
ChallengeSchema.plugin(autoIncrement.plugin, {
    model: 'Challenge',
    startAt: 1
});
// GameSchema.plugin(random);
ChallengeSchema.index({ title: 'text',description: 'text'});
ChallengeSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Challenge',ChallengeSchema);