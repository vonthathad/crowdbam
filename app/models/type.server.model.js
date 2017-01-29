/**
 * Created by andh on 1/29/17.
 */
//Model nay dung de tao cac type content nhu guideline, overview, about me, de sau nay tien cho viec scale
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../configs/config.js'),
    connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);
// var random = require('mongoose-simple-random');
var TypeSchema = new Schema({
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
    },
    url: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[A-Za-z_.-]{3,20}$/, "Please fill a valid type's url"],
        required: 'Url of category is required'
    }
});
TypeSchema.plugin(autoIncrement.plugin, {
    model: 'Type',
    startAt: 1
});
// GameSchema.plugin(random);
TypeSchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Type',TypeSchema);