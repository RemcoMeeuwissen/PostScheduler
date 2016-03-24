'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');
const Post = require('../models/post.js');

router.get('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  Post.find({}).sort('time').exec((err, posts) => {
    if (err) {
      res.render('index', {
        message: 'Could not get the scheduled posts, please try again later.',
        error: {},
        messages: req.flash('info'),
      });
    } else {
      res.render('index', {
        posts,
        messages: req.flash('info'),
      });
    }
  });
});

module.exports = router;
