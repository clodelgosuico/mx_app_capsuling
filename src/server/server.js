(function () {
  'use strict';

  var config = require('./config'),
    app = require('./app'),
    db = require('./db');

  db.ping().then(function() {
    app.start();
  }, function(error) {
    console.error(error);
    db.close();
  });
}());
