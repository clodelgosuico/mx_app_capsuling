(function () {
  'use strict';

  var config = require('./config'),
    elasticsearch = require('elasticsearch'),
    _ = require('lodash');

  console.log('Elastic Search Url: ', config.dbUrl);
  module.exports = _.memoize(function () {
    return new elasticsearch.Client({
      host: config.dbUrl
    });
  })();
})();