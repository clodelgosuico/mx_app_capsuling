(function () {
  'use strict';

  var db = require('../../db');
  var _ = require('lodash');

  module.exports = function (router) {
    router.route('/api/users/:userId/capsuling/profile')
      .get([
        function (req, res) {
          db.search({
            index: 'mxm',
            type: 'capsulingProfile',
            q: 'userId:' + req.session.loggedInMacysUserId || req.session.macysUserId
          }, function (err, data) {
            if (err) {
              console.log('Error loading capsuling profile', err);
              res.sendStatus(500);
            } else if (_.chain(data).result('hits.hits.length').value()) {
              res.send(
                _.chain(data).result('hits.hits')
                  .first().result('_source')
                  .pick(['clothingSize', 'shoeSize', 'budget', 'selectedCategories', 'selectedBrands', 'colorPalette', 'wardrobeId'])
                  .value()
              );
            } else {
              res.sendStatus(404);
            }
          });
        }
      ])
      .post([
        function (req, res, next) {
          db.search({
            index: 'mxm',
            type: 'capsulingProfile',
            q: 'userId:' + req.session.loggedInMacysUserId || req.session.macysUserId
          }).then(function (data) {
            if (_.result(data, 'hits.hits.length') > 0) {
              req.existingProfile = _.chain(data).result('hits.hits').first().value();
            } else {
              req.existingProfile = null;
            }

            next();
          });
        },

        function (req, res) {
          if (req.existingProfile) {
            db.update({
              index: 'mxm',
              type: 'capsulingProfile',
              id: req.existingProfile._id,
              body: {
                doc: _.pick(req.body, ['clothingSize', 'shoeSize', 'budget', 'selectedCategories', 'selectedBrands', 'colorPalette', 'wardrobeId'])
              }
            });
            setTimeout(function(){
              res.sendStatus(201).end();
            },1000);
          } else {
            db.create({
              index: 'mxm',
              type: 'capsulingProfile',
              body: _.merge({
                userId: req.session.loggedInMacysUserId || req.session.macysUserId
              }, _.pick(req.body, ['clothingSize', 'shoeSize', 'budget', 'selectedCategories', 'selectedBrands', 'colorPalette', 'wardrobeId']))
            });
            setTimeout(function(){
              res.sendStatus(201).end();
            },1000);
          }
        }
      ]);
  }
})();