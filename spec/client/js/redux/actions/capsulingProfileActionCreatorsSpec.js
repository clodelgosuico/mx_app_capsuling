import { loadCapsulingProfile, receivedCapsulingProfile, saveCapsulingProfile, saveCapsulingSelection }
  from '../../../../../src/client/js/redux/actions/capsulingProfileActionCreators';

import capsulingProfileActions
  from '../../../../../src/client/js/redux/actions/capsulingProfileActions';

import fetchMock from 'fetch-mock';
import { browserHistory } from 'react-router';

describe('capsuling profile action creators', function () {
  var callbackSpy;

  describe('receivedCapsulingProfile', function () {
    it('return action data', function () {
      var action = receivedCapsulingProfile({
        'clothingSize': 'medium', 'shoeSize': 'medium', 'budget': '$$'
      });

      expect(action.type).toEqual(capsulingProfileActions.RECEIVED_CAPSULING_PROFILE_DATA);
      expect(action.data).toEqual({
        'clothingSize': 'medium', 'shoeSize': 'medium', 'budget': '$$'
      });
    });
  });

  describe('loadCapsulingProfile', function () {
    beforeEach(function () {
      this.action = loadCapsulingProfile(1234);
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('loads capsuling profile data from the server', function () {
      beforeEach(function () {
        fetchMock.mock('/api/users/1234/capsuling/profile', 'GET', {
          status: 200,
          body: {
            'clothingSize': 'medium', 'shoeSize': 'medium', 'budget': '$$'
          }
        });

        this.dispatch = jasmine.createSpy('dispatch');
      });

      afterEach(function () {
        fetchMock.restore();
      });

      it('invokes dispatch with fetched data', function (done) {
        let _this = this;

        this.action(this.dispatch).then(function () {
          expect(_this.dispatch).toHaveBeenCalled();

          done();
        });
      });
    });
  });

  describe('saveCapsulingProfile', function () {
    beforeEach(function () {
      callbackSpy = jasmine.createSpy('callback');
      this.action = saveCapsulingProfile(1234, {
        'clothingSize': 'medium',
        'shoeSize': 'medium',
        'budget': '$$',
        'selectedBrands': [
          'INC',
          'Alfani'
        ],
        'selectedCategories': [
          'cgp:f:heels',
          'cgp:f:sneakers'
        ],
        'colorPalette': {
          'neutral': [
            '#000',
            '#330033',
            '#666633'
          ],
          'main': [
            '#fff',
            '#f4ef5d',
            '#fb9727'
          ],
          'accent': [
            '#7e5a9b',
            '#3467c0',
            '#419f81'
          ]
        }
      }, callbackSpy);
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('returned function invocation', function () {
      beforeEach(function () {
        fetchMock.mock(function (url, options) {
          expect(url).toEqual('/api/users/1234/capsuling/profile');
          expect(options.method).toEqual('POST');
          expect(options.body).toEqual(JSON.stringify({
            'clothingSize': 'medium',
            'shoeSize': 'medium',
            'budget': '$$',
            'selectedBrands': [
              'INC',
              'Alfani'
            ],
            'selectedCategories': [
              'cgp:f:heels',
              'cgp:f:sneakers'
            ],
            'colorPalette': {
              'neutral': [
                '#000',
                '#330033',
                '#666633'
              ],
              'main': [
                '#fff',
                '#f4ef5d',
                '#fb9727'
              ],
              'accent': [
                '#7e5a9b',
                '#3467c0',
                '#419f81'
              ]
            }
          }));
          return true;
        }, 'POST', {
          status: 200,
          body: {}
        });

        this.dispatch = jasmine.createSpy('dispatch');
      });

      afterEach(function () {
        fetchMock.restore();
      });

      it('invokes dispatch with fetched data', function (done) {
        this.action(this.dispatch).then(function () {
          expect(callbackSpy).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('saveCapsulingProfile with existing wardrobe', function () {
    beforeEach(function () {
      callbackSpy = jasmine.createSpy('callback');
      this.action = saveCapsulingProfile(1234, {
        'wardrobeId': 'ABC1234',
        'colorPalette': {
          'main': ['black', 'rust', 'smoke'],
          'neutral': ['smoke', 'navy', 'taupe'],
          'accent': ['blue_pastel', 'navy', 'white']
        }
      }, callbackSpy);
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('returned function invocation', function () {
      beforeEach(function () {

        fetchMock.mock('/api/capsuling/wardrobe/ABC1234', 'PUT', {
          status: 200,
          body: {
            'wardrobeId': 'EylvJITsTe',
            'wardrobeItems': [{
              'id': 837,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweatshirt',
              'defaultColorPalette': 'neutral',
              'name': 'Sweatshirt',
              'colors': ['navy', 'smoke', 'taupe']
            }, {
              'id': 838,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweatshirt',
              'defaultColorPalette': 'neutral',
              'name': 'Sweatshirt',
              'colors': ['navy', 'smoke', 'taupe']
            }, {
              'id': 839,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweatshirt',
              'defaultColorPalette': 'main',
              'name': 'Sweatshirt',
              'colors': ['black', 'rust', 'smoke']
            }, {
              'id': 840,
              'clothingCategoryId': 'cct:f:pants',
              'clothingGroupId': 'cgp:f:softpants',
              'defaultColorPalette': 'neutral',
              'name': 'Softpants',
              'colors': ['navy', 'smoke', 'taupe']
            }, {
              'id': 841,
              'clothingCategoryId': 'cct:f:pants',
              'clothingGroupId': 'cgp:f:yoga_pants',
              'defaultColorPalette': 'neutral',
              'name': 'Yoga Pants',
              'colors': ['navy', 'smoke', 'taupe']
            }, {
              'id': 842,
              'clothingCategoryId': 'cct:f:dresses',
              'clothingGroupId': 'cgp:f:formal_dress',
              'defaultColorPalette': 'neutral',
              'name': 'Formal Dress',
              'colors': ['navy', 'smoke', 'taupe']
            }, {
              'id': 843,
              'clothingCategoryId': 'cct:f:dresses',
              'clothingGroupId': 'cgp:f:formal_dress',
              'defaultColorPalette': 'main',
              'name': 'Formal Dress',
              'colors': ['black', 'rust', 'smoke']
            }, {
              'id': 844,
              'clothingCategoryId': 'cct:f:outerwear',
              'clothingGroupId': 'cgp:f:coat',
              'defaultColorPalette': 'fundamental',
              'name': 'Coat'
            }, {
              'id': 845,
              'clothingCategoryId': 'cct:f:outerwear',
              'clothingGroupId': 'cgp:f:overcoat',
              'defaultColorPalette': 'fundamental',
              'name': 'Overcoat'
            }, {
              'id': 846,
              'clothingCategoryId': 'cct:f:shoes',
              'clothingGroupId': 'cgp:f:sneakers',
              'defaultColorPalette': 'fundamental',
              'name': 'Sneakers'
            }, {
              'id': 847,
              'clothingCategoryId': 'cct:f:shoes',
              'clothingGroupId': 'cgp:f:sneakers',
              'defaultColorPalette': 'fundamental',
              'name': 'Sneakers'
            }, {
              'id': 848,
              'clothingCategoryId': 'cct:f:shoes',
              'clothingGroupId': 'cgp:f:sneakers',
              'defaultColorPalette': 'fundamental',
              'name': 'Sneakers'
            }]
          }
        });

        fetchMock.mock('/api/users/1234/capsuling/profile', 'POST', {
          status: 200,
          body: {}
        });

        this.dispatch = jasmine.createSpy('dispatch');
      });

      afterEach(function () {
        fetchMock.restore();
      });

      it('invokes dispatch with fetched data', function (done) {
        this.action(this.dispatch).then(function () {
          expect(callbackSpy).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('saveCapsulingSelection and creates new wardrobe', function () {
    beforeEach(function () {
      this.action = saveCapsulingSelection(1234, {
        'userId': 9428529912,
        'clothingSize': 'medium',
        'shoeSize': 'medium',
        'budget': '$$',
        'selectedBrands': [
          'INC',
          'Alfani'
        ],
        'selectedCategories': [
          'cgp:f:heels',
          'cgp:f:sneakers'
        ],
        'colorPalette': {
          'neutral': [
            'black',
            'gray',
            'white'
          ],
          'main': [
            'white',
            'red',
            'blue'
          ],
          'accent': [
            'orange',
            'pink',
            'yellow'
          ]
        }
      });
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('returned function invocation', function () {
      beforeEach(function () {
        spyOn(browserHistory, 'push');

        fetchMock.mock('/api/capsuling/wardrobe', 'POST', {
          status: 200,
          body: {
            wardrobeId: 'VkgwuENH6x',
            wardrobeItems: [{
              'id': 712,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:blouse',
              'defaultColorPalette': 'neutral',
              'name': 'Blouse',
              'colors': [
                'black', 'burgundy'
              ]
            }, {
              'id': 713,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:blouse',
              'defaultColorPalette': 'main',
              'name': 'Blouse',
              'colors': [
                'blue', 'sky', 'slate'
              ]
            }, {
              'id': 714,
              'clothingCategoryId': 'cct:f:pants',
              'clothingGroupId': 'cgp:f:active_bottoms',
              'defaultColorPalette': 'neutral',
              'name': 'Athletic Bottom',
              'colors': [
                'black', 'burgundy'
              ]
            }, {
              'id': 715,
              'clothingCategoryId': 'cct:f:shoes',
              'clothingGroupId': 'cgp:f:active_shoe',
              'defaultColorPalette': 'fundamental',
              'name': 'Active Shoe'
            }]
          }
        });

        fetchMock.mock('/api/users/1234/capsuling/profile', 'POST', {
          status: 200,
          body: {}
        });

        this.dispatch = jasmine.createSpy('dispatch');
      });

      afterEach(function () {
        fetchMock.restore();
      });

      it('invokes dispatch with fetched data', function (done) {
        this.action(this.dispatch).then(function () {
          expect(browserHistory.push).toHaveBeenCalledWith('/workwardrobe/results');
          done();
        });
      });
    });
  });

  describe('saveCapsulingSelection and updates existing wardrobe', function () {
    beforeEach(function () {
      this.action = saveCapsulingSelection(1234, {
        'wardrobeId': '567ABC',
        'userId': 9428529912,
        'clothingSize': 'medium',
        'shoeSize': 'medium',
        'budget': '$$',
        'selectedBrands': [
          'INC',
          'Alfani'
        ],
        'selectedCategories': [
          'cgp:f:heels',
          'cgp:f:sneakers'
        ],
        'colorPalette': {
          'neutral': [
            'black',
            'gray',
            'white'
          ],
          'main': [
            'white',
            'red',
            'blue'
          ],
          'accent': [
            'orange',
            'pink',
            'yellow'
          ]
        }
      });
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('returned function invocation', function () {
      beforeEach(function () {
        spyOn(browserHistory, 'push');

        fetchMock.mock('/api/capsuling/wardrobe/567ABC', 'PUT', {
          status: 200,
          body: {
            'wardrobeId': 'Eklz773i6l',
            'wardrobeItems': [{
              'id': 791,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweater',
              'defaultColorPalette': 'neutral',
              'name': 'Sweater',
              'colors': ['black', 'burgundy']
            }, {
              'id': 792,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweater',
              'defaultColorPalette': 'neutral',
              'name': 'Sweater',
              'colors': ['black', 'burgundy']
            }, {
              'id': 793,
              'clothingCategoryId': 'cct:f:top_layers',
              'clothingGroupId': 'cgp:f:sweater',
              'defaultColorPalette': 'main',
              'name': 'Sweater',
              'colors': ['blue', 'sky', 'slate']
            }, {
              'id': 794,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:polo_shirt',
              'defaultColorPalette': 'neutral',
              'name': 'Polo Shirt',
              'colors': ['black', 'burgundy']
            }, {
              'id': 795,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:polo_shirt',
              'defaultColorPalette': 'main',
              'name': 'Polo Shirt',
              'colors': ['blue', 'sky', 'slate']
            }, {
              'id': 796,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:polo_shirt',
              'defaultColorPalette': 'accent',
              'name': 'Polo Shirt',
              'colors': ['carrot', 'eggplant']
            }, {
              'id': 797,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:button_front',
              'defaultColorPalette': 'neutral',
              'name': 'Button Front',
              'colors': ['black', 'burgundy']
            }, {
              'id': 798,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:button_front',
              'defaultColorPalette': 'main',
              'name': 'Button Front',
              'colors': ['blue', 'sky', 'slate']
            }, {
              'id': 799,
              'clothingCategoryId': 'cct:f:primary_shirt',
              'clothingGroupId': 'cgp:f:button_front',
              'defaultColorPalette': 'main',
              'name': 'Button Front',
              'colors': ['blue', 'sky', 'slate']
            }]
          }
        });

        fetchMock.mock('/api/users/1234/capsuling/profile', 'POST', {
          status: 200,
          body: {}
        });

        this.dispatch = jasmine.createSpy('dispatch');
      });

      afterEach(function () {
        fetchMock.restore();
      });

      it('invokes dispatch with fetched data', function (done) {
        this.action(this.dispatch).then(function () {
          expect(browserHistory.push).toHaveBeenCalledWith('/workwardrobe/results');
          done();
        });
      });
    });
  });
});
