(function () {
  'use strict';

  var app = require('../support/app');
  var stubDB = require('../support/stubDB')();
  var encryptedSessionCookieUtils = require('../../../src/server/encryptedSessionCookieUtils');

  describe('load capsuling profile', function () {
    describe('if capsuling profile is found', function () {
      beforeEach(function () {
        stubDB
          .post('/mxm/capsulingProfile/_search?q=' + encodeURIComponent('userId:123456789'))
          .reply(200, {
            'hits': {
              'total': 1,
              'max_score': 1.4054651,
              'hits': [
                {
                  '_index': 'mxm',
                  '_type': 'capsulingProfile',
                  '_id': 'AVIO712q1nkZiVW8JhK4',
                  '_score': 1.4054651,
                  '_source': {
                    'userId': '123456789',
                    'clothingSize': 'regular',
                    'shoeSize': 'medium',
                    'budget': '$$',
                    'selectedCategories': [
                      'cgp:f:button_front',
                      'cgp:f:sweatshirt'
                    ],
                    'selectedBrands': [
                      'Alfani',
                      'INC'
                    ],
                    colorPalette: {
                      neutral: [
                        '#000',
                        '#330033',
                        '#666633'
                      ],
                      main: [
                        '#fff',
                        '#f4ef5d',
                        '#fb9727'
                      ],
                      accent: [
                        '#7e5a9b',
                        '#3467c0',
                        '#419f81'
                      ]
                    }
                  }
                }
              ]
            }
          });
      });

      it('return capsuling profile information', function (done) {
        app.get('/api/users/ed9a2e40-df15-11e5-9ed0-af7ceaae40f8/capsuling/profile')
          .set('Accept', 'application/json')
          .set('Cookie', encryptedSessionCookieUtils.encode({
            userId: 'ed9a2e40-df15-11e5-9ed0-af7ceaae40f8',
            loggedInMacysUserId: 123456789
          }))
          .end(function (err, res) {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
              clothingSize: 'regular',
              shoeSize: 'medium',
              budget: '$$',
              selectedCategories: [
                'cgp:f:button_front',
                'cgp:f:sweatshirt'
              ],
              selectedBrands: [
                'Alfani',
                'INC'
              ],
              colorPalette: {
                neutral: [
                  '#000',
                  '#330033',
                  '#666633'
                ],
                main: [
                  '#fff',
                  '#f4ef5d',
                  '#fb9727'
                ],
                accent: [
                  '#7e5a9b',
                  '#3467c0',
                  '#419f81'
                ]
              }
            });
            done();
          });
      });
    });

    describe('if capsuling profile is not found', function () {
      beforeEach(function () {
        stubDB
          .post('/mxm/capsulingProfile/_search?q=' + encodeURIComponent('userId:123456789'))
          .reply(200, {
            'hits': {
              'total': 0,
              'hits': []
            }
          });
      });

      it('returns 404', function (done) {
        app.get('/api/users/ed9a2e40-df15-11e5-9ed0-af7ceaae40f8/capsuling/profile')
          .set('Accept', 'application/json')
          .set('Cookie', encryptedSessionCookieUtils.encode({
            userId: 'ed9a2e40-df15-11e5-9ed0-af7ceaae40f8',
            loggedInMacysUserId: 123456789
          }))
          .end(function (err, res) {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('save capsuling profile', function () {
    describe('if no profile exists before', function () {
      beforeEach(function () {
        stubDB
          .post('/mxm/capsulingProfile/_search?q=' + encodeURIComponent('userId:123456789'))
          .reply(200, {
            'hits': {
              'total': 0,
              'max_score': null,
              'hits': []
            },
            '_shards': {
              'total': 1,
              'successful': 1,
              'failed': 0
            },
            'timed_out': false,
            'took': 1
          });

        stubDB
          .post('/mxm/capsulingProfile?op_type=create', {
            userId: 123456789,
            clothingSize: 'regular',
            shoeSize: 'medium',
            budget: '$$',
            selectedCategories: [
              'cgp:f:button_front',
              'cgp:f:sweatshirt'
            ],
            'selectedBrands': [
              'Alfani',
              'INC'
            ],
            colorPalette: {
              neutral: [
                '#000',
                '#330033',
                '#666633'
              ],
              main: [
                '#fff',
                '#f4ef5d',
                '#fb9727'
              ],
              accent: [
                '#7e5a9b',
                '#3467c0',
                '#419f81'
              ]
            }
          })
          .reply(201, {});
      });

      it('creates new profile in db', function (done) {
        app
          .post('/api/users/ed9a2e40-df15-11e5-9ed0-af7ceaae40f8/capsuling/profile')
          .set('Cookie', encryptedSessionCookieUtils.encode({
            userId: 'ed9a2e40-df15-11e5-9ed0-af7ceaae40f8',
            loggedInMacysUserId: 123456789
          }))
          .send({
            clothingSize: 'regular',
            shoeSize: 'medium',
            budget: '$$',
            selectedCategories: [
              'cgp:f:button_front',
              'cgp:f:sweatshirt'
            ],
            'selectedBrands': [
              'Alfani',
              'INC'
            ],
            colorPalette: {
              neutral: [
                '#000',
                '#330033',
                '#666633'
              ],
              main: [
                '#fff',
                '#f4ef5d',
                '#fb9727'
              ],
              accent: [
                '#7e5a9b',
                '#3467c0',
                '#419f81'
              ]
            }
          })
          .set('Accept', 'application/json')
          .end(function (err, res) {
            expect(res.status).toEqual(201);
            expect(stubDB.isDone()).toBe(true);
            done();
          });
      });
    });

    describe('if profile exists', function () {
      beforeEach(function () {
        stubDB
          .post('/mxm/capsulingProfile/_search?q=' + encodeURIComponent('userId:123456789'))
          .reply(200, {
            'hits': {
              'total': 1,
              'max_score': 5.803202,
              'hits': [
                {
                  '_index': 'mxm',
                  '_type': 'capsulingProfile',
                  '_id': 'AVC1UssIptIi_pr26qYm',
                  '_score': 5.803202,
                  '_source': {
                    clothingSize: 'regular',
                    shoeSize: 'medium',
                    budget: '$$',
                    selectedCategories: [
                      'cgp:f:button_front',
                      'cgp:f:sweatshirt'
                    ],
                    selectedBrands: [
                      'Alfani',
                      'INC'
                    ],
                    colorPalette: {
                      neutral: [
                        '#000',
                        '#330033',
                        '#666633'
                      ],
                      main: [
                        '#fff',
                        '#f4ef5d',
                        '#fb9727'
                      ],
                      accent: [
                        '#7e5a9b',
                        '#3467c0',
                        '#419f81'
                      ]
                    }
                  }
                }
              ]
            }
          });

        stubDB
          .post('/mxm/capsulingProfile/AVC1UssIptIi_pr26qYm/_update', {
            doc: {
              clothingSize: 'regular',
              shoeSize: 'medium',
              budget: '$$',
              selectedCategories: [
                'cgp:f:button_front',
                'cgp:f:sweatshirt'
              ],
              selectedBrands: [
                'Alfani',
                'INC'
              ],
              colorPalette: {
                neutral: [
                  '#000',
                  '#330033',
                  '#666633'
                ],
                main: [
                  '#fff',
                  '#f4ef5d',
                  '#fb9727'
                ],
                accent: [
                  '#7e5a9b',
                  '#3467c0',
                  '#419f81'
                ]
              }
            }
          })
          .reply(200);
      });

      it('updates profile in db', function (done) {
        app
          .post('/api/users/ed9a2e40-df15-11e5-9ed0-af7ceaae40f8/capsuling/profile')
          .set('Cookie', encryptedSessionCookieUtils.encode({
            userId: 'ed9a2e40-df15-11e5-9ed0-af7ceaae40f8',
            loggedInMacysUserId: 123456789
          }))
          .send({
            clothingSize: 'regular',
            shoeSize: 'medium',
            budget: '$$',
            selectedCategories: [
              'cgp:f:button_front',
              'cgp:f:sweatshirt'
            ],
            selectedBrands: [
              'Alfani',
              'INC'
            ],
            colorPalette: {
              neutral: [
                '#000',
                '#330033',
                '#666633'
              ],
              main: [
                '#fff',
                '#f4ef5d',
                '#fb9727'
              ],
              accent: [
                '#7e5a9b',
                '#3467c0',
                '#419f81'
              ]
            }
          })
          .set('Accept', 'application/json')
          .end(function (err, res) {
            expect(res.status).toEqual(201);
            expect(stubDB.isDone()).toBe(true);
            done();
          });
      });
    });
  });
})();