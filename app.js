

var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var index = express.Router();
var api = express.Router();
require('./app/routes/index')(index);
require('./app/routes/api')(api);
var compress = require('compression');
var app = express();

app.use(cors());

// set first
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// then use filter
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  console.log('Dev Mode');
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
  console.log('Product Mode');
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "CROWDBAM"
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(express.static(path.join(__dirname, 'public/uploaded')));
app.use(passport.initialize());
// app.use(passport.session());
//load routes below here
app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
