var config = require('./config'),
    mongoose = require('mongoose');
module.exports = function(callback) {
    var db = mongoose.connect(config.database);
    console.log(config.database);
    var dbc = mongoose.connection;
    dbc.on('error', console.error.bind(console, 'connection error:'));
    dbc.once('open', function() {
        console.log("DB connect successfully!");
        callback();
    });
    require('../models/user.server.model');
    return db;
};