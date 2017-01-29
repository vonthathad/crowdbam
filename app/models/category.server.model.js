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
var CategorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title of category is required',
        maxlength: 36
    },
    thumb: {
        type: String,
        trim: true,
        required: 'Thumb of category is required'
    },
    url: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[A-Za-z_.-]{3,20}$/, "Please fill a valid category's url"],
        required: 'Url of category is required'
    }
});
CategorySchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    startAt: 1
});
// GameSchema.plugin(random);
CategorySchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Category',CategorySchema);