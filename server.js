var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// CARLIE START
var session = require('express-session');
var passport = require('passport');
// CARIE END
var methodOverride = require('method-override');
var request = require('request');
require('dotenv').config();
require('./config/database');
// CARLIE START
require('./config/passport');
// CARIE END

var index = require('./routes/index');
var users = require('./routes/users');
var apiBusinesses = require('./routes/api/businesses');
var apiUsers = require('./routes/api/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// CARLIE START
require('ejs').delimiter = '$';
// CARIE END

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'WDIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))
app.use('/', index);
app.use('/users', users);
app.use('/api/businesses', apiBusinesses);
app.use('/api/users', apiUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
