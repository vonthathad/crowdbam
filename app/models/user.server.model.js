var mongoose = require('mongoose');
var crypto = require('crypto');
var autoIncrement = require('mongoose-auto-increment');
var config = require('../configs/config');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);
Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id: String,
    displayName: String,
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        match: [/^[A-Za-z0-9_.]{1,15}$/, "Please fill a valid username"],
        trim: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 5;
            }, 'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    recommendations: [],
    avatar: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    bio: String,
    website: String,
    role: {
        type: String,
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    token: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
UserSchema.statics.findUserByEmail = function(email, callback) {
    this.findOne({
        email: email
    },'-password -salt', callback);
};
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64,'sha1').toString('base64');
};
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
UserSchema.statics.findUniqueUsername = function(username, suffix,
                                                 callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('User',UserSchema);