import { receivedWardrobe, getWardrobe, receivedSuggestedItems, getSuggestedItems, getItemNameForSearch }
  from '../../../../../src/client/js/redux/actions/capsulingResultsActionCreators';

import capsulingResultsActions
  from '../../../../../src/client/js/redux/actions/capsulingResultsActions';

import fetchMock from 'fetch-mock';

describe('capsuling profile action creators', function () {
  describe('receivedCapsulingProfile', function () {
    it('return action data', function () {
      var action = receivedWardrobe([{
        'id': 693,
        'clothingCategoryId': 'cct:f:primary_shirt',
        'clothingGroupId': 'cgp:f:blouse',
        'defaultColorPalette': 'neutral'
      }, {
        'id': 694,
        'clothingCategoryId': 'cct:f:primary_shirt',
        'clothingGroupId': 'cgp:f:blouse',
        'defaultColorPalette': 'main'
      }, {
        'id': 695,
        'clothingCategoryId': 'cct:f:pants',
        'clothingGroupId': 'cgp:f:active_bottoms',
        'defaultColorPalette': 'neutral'
      }, {
        'id': 696,
        'clothingCategoryId': 'cct:f:shoes',
        'clothingGroupId': 'cgp:f:active_shoe',
        'defaultColorPalette': 'fundamental'
      }]);

      expect(action.type).toEqual(capsulingResultsActions.RECEIVED_WARDROBE);
      expect(action.data).toEqual([{
        'id': 693,
        'clothingCategoryId': 'cct:f:primary_shirt',
        'clothingGroupId': 'cgp:f:blouse',
        'defaultColorPalette': 'neutral'
      }, {
        'id': 694,
        'clothingCategoryId': 'cct:f:primary_shirt',
        'clothingGroupId': 'cgp:f:blouse',
        'defaultColorPalette': 'main'
      }, {
        'id': 695,
        'clothingCategoryId': 'cct:f:pants',
        'clothingGroupId': 'cgp:f:active_bottoms',
        'defaultColorPalette': 'neutral'
      }, {
        'id': 696,
        'clothingCategoryId': 'cct:f:shoes',
        'clothingGroupId': 'cgp:f:active_shoe',
        'defaultColorPalette': 'fundamental'
      }]);
    });
  });

  describe('getWardrobe', function () {
    beforeEach(function () {
      this.action = getWardrobe();
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('loads wardrobe data from the server', function () {
      beforeEach(function () {
        fetchMock.mock('/api/capsuling/wardrobe', 'GET', {
          status: 200,
          body: [{
            'id': 693,
            'clothingCategoryId': 'cct:f:primary_shirt',
            'clothingGroupId': 'cgp:f:blouse',
            'defaultColorPalette': 'neutral'
          }, {
            'id': 694,
            'clothingCategoryId': 'cct:f:primary_shirt',
            'clothingGroupId': 'cgp:f:blouse',
            'defaultColorPalette': 'main'
          }, {
            'id': 695,
            'clothingCategoryId': 'cct:f:pants',
            'clothingGroupId': 'cgp:f:active_bottoms',
            'defaultColorPalette': 'neutral'
          }, {
            'id': 696,
            'clothingCategoryId': 'cct:f:shoes',
            'clothingGroupId': 'cgp:f:active_shoe',
            'defaultColorPalette': 'fundamental'
          }]
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

  describe('receivedSuggestedItems', function () {
    it('return action data', function () {
      var action = receivedSuggestedItems([{
        'id': 693
      }]);

      expect(action.type).toEqual(capsulingResultsActions.RECEIVED_SUGGESTED_ITEMS);
      expect(action.data).toEqual([{
        'id': 693
      }]);
    });
  });

  describe('getSuggestedItems', function () {
    beforeEach(function () {
      this.action = getSuggestedItems('pants', 'Black,White', 'Regular', 'Medium');
    });

    it('return a invokable function', function () {
      expect(typeof this.action).toEqual('function');
    });

    describe('loads suggested items data from the server', function () {
      beforeEach(function () {
        var url = '/api/capsuling/products?searchphrase=pants&SPECIAL_SIZE=Regular' +
          '&GENDER=Female%2CTeen%20Girls&COLOR_NORMAL=Black,White';

        fetchMock.mock(url,
          'GET', {
            status: 200,
            body: [{
              'id': 693
            }]
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

  describe('getItemNameForSearch', function () {
    it('returns the itemNameForSearch', function () {
      expect(getItemNameForSearch('Dress', 'Regular'))
        .toEqual('Dress&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Mini', 'Regular'))
        .toEqual('Mini Skirt&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Knee-length', 'Regular'))
        .toEqual('Knee-length Skirt&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Maxi', 'Regular'))
        .toEqual('Maxi Skirt&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Loafers', 'Regular', 'Wide'))
        .toEqual('Womens Loafers&SHOE_WIDTH=Wide');
      expect(getItemNameForSearch('Day Dress', 'Regular'))
        .toEqual('Dresses&SPECIAL_OCCASIONS=Daytime&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Business Dress', 'Regular'))
        .toEqual('Dresses&SPECIAL_OCCASIONS=Wear to Work&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Jackets', 'Regular'))
        .toEqual('Jackets&JACKET_STYLE=Active,Anorak,Bomber,Denim&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Overcoat', 'Regular'))
        .toEqual('Overcoat&COAT_STYLE=Raincoat,Trenchcoat&SPECIAL_SIZE=Regular');
      expect(getItemNameForSearch('Dress Trousers', 'Regular'))
        .toEqual('Pants&PANT_STYLE=Trouser&SPECIAL_SIZE=Regular');
    });
  });
});
