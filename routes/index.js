'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAuthorized = require('../middleware/ensureAuthorized');

router.get('/', ensureAuthenticated, ensureAuthorized, (req, res) => {
  res.render('index', { user: req.user });
});

module.exports = router;
