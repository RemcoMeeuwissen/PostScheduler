'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');
const User = require('../models/user.js');

router.get('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  User.find({}).sort('-authorized').exec((err, users) => {
    if (err) {
      res.render('error', {
        message: 'Could not get a list of users, please try again later.',
        error: {},
      });
    } else {
      res.render('authorize', {
        current_user: req.user,
        users,
        messages: req.flash('info'),
      });
    }
  });
});

router.get('/:id', ensureAuthenticated, ensureAuthorized, (req, res) => {
  if (req.user._id === req.params.id) {
    req.flash('info', 'You can not deauthorize yourself.');
    return res.redirect('/authorize');
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || user === null) {
      req.flash('info', 'Could not retrieve the user from the database, please try again later.');
      return res.redirect('/authorize');
    }

    user.authorized = ! user.authorized;

    user.save((saveErr) => {
      if (saveErr) {
        req.flash('info', 'Could not store the new user data, please try again later.');
      } else {
        req.flash('info', 'The authorization data has been updated.');
      }

      return res.redirect('/authorize');
    });
  });
});

module.exports = router;
