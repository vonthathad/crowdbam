/**
 * Created by andh on 1/29/17.
 */
//Se sort theo deadline de biet cai nao truoc cai nao sau, va dang o trong stage nao. Lay ve ngay luc vao url cua du an.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TimelineSchema = new Schema({
    challenge: {
        type: Number,
        ref: 'Challenge'
    },
    title: {
        type: String,
        required: 'Title cannot be blank'
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    }
});
mongoose.model('Timeline', TimelineSchema);