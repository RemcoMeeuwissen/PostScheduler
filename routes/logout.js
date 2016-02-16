'use strict';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
