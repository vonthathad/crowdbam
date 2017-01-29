/**
 * Created by andh on 1/29/17.
 */
//Model nay dung de tao cac type content nhu guideline, overview, about me, de sau nay tien cho viec scale. Lay id lam url luon, vi du time-line
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// var random = require('mongoose-simple-random');
var TypeSchema = new Schema({
    _id: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[A-Za-z-]{3,20}$/, "Please fill a valid type's id"],
        required: 'Id of type is required'
    },
    title: {
        type: String,
        trim: true,
        required: 'Title of type is required',
        maxlength: 36
    },
    description: {
        type: String,
        trim: true,
        required: 'Description of type is required',
        maxlength: 140
    }
});
// GameSchema.plugin(random);
TypeSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Type',TypeSchema);