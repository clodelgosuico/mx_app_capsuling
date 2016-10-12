(function () {
  'use strict';
  module.exports = function (req, res, next) {
    if (req.path === '' || req.path === '/') {
      if (req.get('Referrer')) {
        res.cookie('MX_referrer', req.get('Referrer'), {expires: 0}); //sessio cookie
      }

      if (req.query.utm_source) {
        res.cookie('MX_utm_source', req.query.utm_source, {expires: 0}); //sessio cookie
      }
    }

    next();
  };
})();
