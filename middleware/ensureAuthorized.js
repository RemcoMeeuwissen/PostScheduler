'use strict';

function ensureAuthorized(req, res, next) {
  if (req.user.authorized) return next();
  res.render('unauthorized');
}

module.exports = ensureAuthorized;
