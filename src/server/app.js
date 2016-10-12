(function () {
  'use strict';

  var cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    clientSessions = require('client-sessions'),
    express = require('express'),
    compression = require('compression'),
    app = express(),
    request = require('request'),
    ensureUser = require('./ensureUser'),
    authorizeUser = require('./authorizeUser'),
    config = require('./config'),
    defaultCacheControl = require('./defaultCacheControl'),
    defaultCookies = require('./defaultCookies'),
    fs = require('fs'),
    http = require('http');

  if (process.env.TRACE) {
    request.debug = true;
  }

  app.use(
    compression(),
    cors({
      origin: false
    }),
    cookieParser(),
    bodyParser.json(),
    clientSessions({
      secret: config.secret,
      cookieName: 'session'
    }),
    ensureUser,
    authorizeUser,
    defaultCacheControl,
    defaultCookies
  );

  var router = express.Router();
  require('./routes/mx_app_routes/route.capsuling')(router);

  app.use(router);

  app.start = function() {
    var httpServer = http.createServer(app);
    httpServer.listen(config.port, config.host);
    console.log('Node server running at http://%s:%s', config.host, config.port);
  };

  module.exports = app;
})();
