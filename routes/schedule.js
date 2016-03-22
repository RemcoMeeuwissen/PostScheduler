'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');

router.get('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  res.render('schedule');
});

router.post('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  console.log(req.body.inputTitle);
  console.log(req.body.inputBody);
  console.log(req.body.inputDate);
  console.log(req.body.inputTime);
  console.log(req.body.inputRepeats);
  console.log(req.body.inputInterval);

  res.render('schedule');
});

module.exports = router;
