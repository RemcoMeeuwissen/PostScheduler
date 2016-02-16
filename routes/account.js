'use strict';

const express = require('express');
const router = new express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

module.exports = router;
