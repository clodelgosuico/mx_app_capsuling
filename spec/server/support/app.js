(function () {
  process.env.STYLE_GUIDE = true;

  var supertest = require('supertest');
  var app = require('../../../src/server/app');
  var nock = require('nock');

  nock.enableNetConnect('127.0.0.1');

  module.exports = supertest(app);
})();