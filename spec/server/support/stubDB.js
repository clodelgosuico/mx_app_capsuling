(function () {
  var nock = require('nock');
  var config = require('../../../src/server/config');
  var _ = require('lodash');

  module.exports = _.memoize(function () {
    return nock(config.dbUrl, {
      allowUnmocked: false
    });
  });
})();