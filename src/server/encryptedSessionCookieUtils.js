(function () {
  'use strict';

  var _ = require('lodash'),
    clientSession = require('client-sessions'),
    config = require('./config');

  var opts = {
    secret: config.secret,
    cookieName: 'session'
  };

  function parseCookieHeader(cookieHeader) {
    return _.reduce(cookieHeader, function (a, cookie) {
      var keyValueString = _.first(cookie.split(';'));
      var pair = keyValueString.split('=');
      var key = pair[0];
      var value = pair[1];
      return _.set(a, key, value);
    }, {});
  }

  module.exports = {
    encode: function (sessionContents) {
      return 'session=' + clientSession.util.encode(opts, sessionContents);
    },

    decode: function (setCookieHeader) {
      var session = parseCookieHeader(setCookieHeader).session;
      if (session) {
        return clientSession.util.decode(opts, session).content;
      }
    }
  };
})();