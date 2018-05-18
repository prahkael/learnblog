// *****************************************************************************
// Imports
// *****************************************************************************

var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var logger        = require('morgan');

var postRoutes    = require('./api/post/post.routes');
var commentRoutes = require('./api/comment/comment.routes');

var connectDatabase = require('./database');

// *****************************************************************************
// Locals
// *****************************************************************************

var app = express();

// *****************************************************************************
// Setup
// *****************************************************************************

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

connectDatabase();

app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
