/**
 * Created by andh on 1/29/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ContentSchema = new Schema({
    challenge: {
        type: Number,
        ref: 'Challenge',
        required: 'Challenge cannot be blank'
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    },
    type: {
        type: Number,
        ref: 'Type',
        required: 'Type cannot be blank'
    },
    html: {
        type: String,
        required: 'Html cannot be blank'
    }
});
mongoose.model('Content', ContentSchema);