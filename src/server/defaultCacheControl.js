(function () {
  'use strict';

  module.exports = function (req, res, next) {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'must-revalidate, private');
    next();
  };
})();
