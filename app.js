'use strict';

const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const logger = require('morgan');

const config = require('./config.json');

const index = require('./routes/index');
const login = require('./routes/login');
const authReddit = require('./routes/auth/reddit');
const logout = require('./routes/logout');
const account = require('./routes/account');

mongoose.connect('mongodb://localhost/PostScheduler');

const app = express();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new RedditStrategy({
  clientID: config.reddit.key,
  clientSecret: config.reddit.secret,
  callbackURL: config.reddit.callback,
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.use(logger('dev'));
app.set('view engine', 'nunjucks');
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/auth/reddit', authReddit);
app.use('/logout', logout);
app.use('/account', account);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
