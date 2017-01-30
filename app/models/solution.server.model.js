/**
 * Created by andh on 1/29/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../configs/config.js'),
    connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);
var SolutionSchema = new Schema({
    challenge: {
        type: Number,
        ref: 'Challenge',
        required: 'Challenge cannot be blank'
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Number,
        ref: 'User',
        required: 'User cannot be blank'
    },
    modified: {
        type: Date
    },
    html: {
        type: String,
        required: 'Html cannot be blank'
    }
});
SolutionSchema.plugin(autoIncrement.plugin, {
    model: 'Solution',
    startAt: 1
});
mongoose.model('Solution', SolutionSchema);