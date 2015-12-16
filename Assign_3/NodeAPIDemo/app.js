console.log("In app.js, top");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport package in our application
app.use(passport.initialize());


//allows CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {

    //do logging
    console.log("(In app.js) In use(CORS) method..."); //used to see where we are

    //allows Cross-Origin Resource Sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next(); //makes sure we go to the next routes and don't stop here
});

// gets rid of 304 http status code messages
app.disable('etag');


app.use('/api', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

    //do logging
    console.log("(In app.js) In use(first) method ..."); //used to see where we are

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

    //do logging
    console.log("(In app.js) In use(second) method ..."); //used to see where we are

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;