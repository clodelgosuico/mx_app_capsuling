(function () {
  'use strict';

  var idGenerator = require('./idGenerator');

  module.exports = function (req, res, next) {
    if (req.session.userId === undefined) {
      req.session.userId = idGenerator.next();
    }

    res.cookie('userid', req.session.userId);

    next();
  };
})();
