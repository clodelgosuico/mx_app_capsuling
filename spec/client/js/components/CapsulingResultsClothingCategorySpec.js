import React from 'react';
import CapsulingResultsClothingCategory from '../../../../src/client/js/components/CapsulingResultsClothingCategory';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Results Clothing Category Spec', function () {
  var instance, clothingCategoryObj, suggestedItems, getSuggestedItems, capsulingProfile;

  describe('#render', function () {
    beforeEach(function () {
      clothingCategoryObj = {
        'clothingCategoryId': 'cct:f:primary_shirt',
        'clothingCategoryName': 'tops',
        'clothingGroups': [{
          'id': 693,
          'clothingGroupId': 'cgp:f:blouse',
          'defaultColorPalette': 'neutral',
          'name': 'Blouse',
          'colors': ['black', 'navy'],
          'mColors': ['Black', 'Blue'],
          'hexColors': ['#000', '#123']
        }, {
          'id': 694,
          'clothingGroupId': 'cgp:f:blouse',
          'defaultColorPalette': 'main',
          'name': 'Blouse',
          'colors': ['blue', 'green', 'yellow'],
          'mColors': ['Blue', 'Green', 'Yellow'],
          'hexColors': ['#000', '#111', '#222']
        }]
      };
      suggestedItems = {};
      getSuggestedItems = function () {
      };
      capsulingProfile = {
        clothingSize: 'Regular',
        shoeSize: 'Medium'
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingResultsClothingCategory clothingCategory={clothingCategoryObj}
                                          suggestedItems={suggestedItems}
                                          getSuggestedItems={getSuggestedItems}
                                          capsulingProfile={capsulingProfile} />
      );
    });

    it('renders clothing category header', function () {
      var results = ReactTestUtils.find(instance, '.clothing-category h2');

      expect(results[0].textContent).toContain(clothingCategoryObj.clothingCategoryName);
    });

    it('renders clothing group', function () {
      var results = ReactTestUtils.find(instance, '.clothing-category .clothing-group');

      expect(results.length).toEqual(2);
    });
  });
});
