(function () {
  'use strict';

  var _ = require('lodash'),
    URI = require('URIjs');

  module.exports = function (req, res, next) {
    if (req.url.match(/^\/api\/users/)) {
      var userid = _.last(_.take(URI(req.url).segment(), 3));
      if (userid !== req.session.userId) {
        res.sendStatus(403).end();
        return;
      }
    }
    next();
  };
})();
