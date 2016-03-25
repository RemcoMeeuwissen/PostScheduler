'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');
const Post = require('../models/post.js');

router.get('/new', ensureAuthenticated, ensureAuthorized, (req, res) => {
  res.render('posts/new');
});

router.post('/new', ensureAuthenticated, ensureAuthorized, (req, res) => {
  const title = req.body.inputTitle;
  const body = req.body.inputBody;
  const subreddit = req.body.inputSubreddit;
  const time = new Date(req.body.inputTime);

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
    subreddit,
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

router.get('/edit/:id', ensureAuthenticated, ensureAuthorized, (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err || post === null) {
      res.render('posts/edit', {
        message: 'Could not retrieve the post, please try again later.',
      });
    } else {
      const time = new Date(post.time);
      const year = time.getFullYear();
      const month = time.getMonth();
      const day = time.getDay();
      const hours = time.getHours();
      const minutes = time.getMinutes();

      res.render('posts/edit', {
        post,
        time: `${year}.${month}.${day} ${hours}:${minutes}`,
      });
    }
  });
});

router.get('/delete/:id', ensureAuthenticated, ensureAuthorized, (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err || post === null) {
      res.render('posts/delete', {
        message: 'Could not retrieve the post, please try again later.',
      });
    } else {
      res.render('posts/delete', {
        post,
      });
    }
  });
});

router.post('/delete/:id', ensureAuthenticated, ensureAuthorized, (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id }, (err, post) => {
    if (err || post === null) {
      req.flash('info', 'Could not remove the post, please try again later.');
    } else {
      req.flash('info', 'Removed the post.');
    }

    return res.redirect('/');
  });
});

module.exports = router;
