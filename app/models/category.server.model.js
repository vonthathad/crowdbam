/**
 * Created by andh on 1/29/17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// var random = require('mongoose-simple-random');
var CategorySchema = new Schema({
    _id: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[A-Za-z-]{3,20}$/, "Please fill a valid category's url"],
        required: 'Url of category is required'
    },
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
    }
});
// GameSchema.plugin(random);
CategorySchema.set('toJSON',{getters: true,virtuals: true});
mongoose.model('Category',CategorySchema);