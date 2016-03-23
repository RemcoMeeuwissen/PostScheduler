'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');
const Post = require('../models/post.js');

router.get('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  res.render('schedule');
});

router.post('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  const title = req.body.inputTitle;
  const body = req.body.inputBody;
  const time = new Date(new Date(req.body.inputDay).setHours(req.body.inputHour));

  let repeats = false;
  if (req.body.inputRepeats === '1') repeats = true;

  let interval = 0;
  if (repeats) {
    if (req.body.inputInterval === 'daily') interval = 60 * 60 * 24;
    if (req.body.inputInterval === 'weekly') interval = 60 * 60 * 24 * 7;
  }

  const newPost = new Post({
    title,
    body,
    time,
    repeats,
    interval,
  });

  newPost.save((err, post) => {
    if (err || post === null) {
      req.flash('info', 'Could not add the post, please try again later.');
    } else {
      req.flash('info', 'The post has been scheduled.');
    }

    return res.redirect('/');
  });
});

module.exports = router;
