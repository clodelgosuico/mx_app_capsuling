(function () {
  'use strict';
  var uuid = require('node-uuid');
  module.exports = {
    next: function () {
      return uuid.v1();
    }
  };
})();
