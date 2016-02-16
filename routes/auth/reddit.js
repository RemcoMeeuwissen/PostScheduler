'use strict';

const express = require('express');
const router = new express.Router();
const passport = require('passport');
const crypto = require('crypto');

router.get('/', (req, res, next) => {
  req.session.state = crypto.randomBytes(32).toString('hex');
  passport.authenticate('reddit', {
    state: req.session.state,
  })(req, res, next);
});

router.get('/callback', (req, res, next) => {
  if (req.query.state === req.session.state) {
    passport.authenticate('reddit', {
      successRedirect: '/',
      failureRedirect: '/login',
    })(req, res, next);
  } else {
    next(new Error(403));
  }
});

module.exports = router;
