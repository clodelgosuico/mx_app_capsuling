/**
 * @file config.js
 * Define global server-side configuration
 */

(function () {
  'use strict';

  var authCode = new Buffer(process.env.MACYS_PROTECTED_SERVICES_KEY + ':' + process.env.MACYS_PROTECTED_SERVICES_SHARED_SECRET).toString('base64');

  module.exports = {
    host: '0.0.0.0',
    port: process.env.PORT || 8001,
    secret: process.env.MACYS_VANGUARD_SECRET || 'MYSUPERSECRETVANGUARDSECRETLONGKEY',
    env: process.env.NODE_ENV || 'development',

    dbUrl: process.env.DB_URL || 'http://localhost:9200',

    // configuration options for the proxy layer
    proxy: {
      host: process.env.MACYS_API_HOST,
      authHost: process.env.MACYS_AUTH_HOST,
      refreshGrantHost: process.env.MACYS_API_HOST,
      suggestionsHost: 'http://www.macys.com',
      catalogClientId: process.env.MACYS_NON_PROTECTED_SERVICES_KEY,
      orderClientId: process.env.MACYS_ORDER_SERVICES_KEY,
      protectedServicesKey: process.env.MACYS_PROTECTED_SERVICES_KEY,
      authClientId: authCode,
      supported: ['GET'],
      bearerTokenExpire: 300
    }
  };
}());
