import React from 'react';
import CapsulingResultsClothingGroup from '../../../../src/client/js/components/CapsulingResultsClothingGroup';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Results Clothing Group Spec', function () {
  var instance, clothingGroupObj, suggestedItems, getSuggestedItems, capsulingProfile;

  describe('#render', function () {
    beforeEach(function () {
      clothingGroupObj = {
        'id': 693,
        'clothingGroupId': 'cgp:f:blouse',
        'defaultColorPalette': 'neutral',
        'name': 'Blouse',
        'colors': ['black', 'navy'],
        'mColors': ['Black', 'Blue'],
        'hexColors': ['#000', '#1c1947'],
        'clothingGroupImg': 'top_blouse.jpg'
      };
      suggestedItems = {
        'Blouse:Black,Blue': {
          'items': [
            {
              'title': 'product one',
              'image': '/src/a.jpg',
              'price': 39.00,
              'originalPrice': 40
            },

            {
              'title': 'product two',
              'image': '/src/b.jpg',
              'price': 49.00,
              'originalPrice': 50
            },

            {
              'title': 'product three',
              'image': '/src/c.jpg',
              'price': 59.00,
              'originalPrice': 60
            },

            {
              'title': 'product four',
              'image': '/src/d.jpg',
              'price': 69.00,
              'originalPrice': 70
            }]
        }
      };
      capsulingProfile = {
        clothingSize: 'Regular',
        shoeSize: 'Medium'
      };
      getSuggestedItems = jasmine.createSpy('getSuggestedItems');

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingResultsClothingGroup clothingGroup={clothingGroupObj}
                                       suggestedItems={suggestedItems}
                                       getSuggestedItems={getSuggestedItems}
                                       capsulingProfile={capsulingProfile} />
      );
    });

    it('renders clothing group name', function () {
      var results = ReactTestUtils.find(instance, '.clothing-group .name');

      expect(results[0].textContent).toContain('Blouse');
    });

    it('renders clothing group defaultColorPalette', function () {
      var results = ReactTestUtils.find(instance, '.clothing-group .defaultColorPalette');

      expect(results[0].textContent).toContain('neutral');
    });

    it('should call getSuggestedItems', function () {
      expect(getSuggestedItems).toHaveBeenCalledWith('Blouse', 'Black,Blue', 'Regular', 'Medium');
    });

    it('should getMColors', function () {
      expect(instance.getMColors()).toEqual('Black,Blue');
    });

    it('should render the product thumbnail carousel', function () {
      var results = ReactTestUtils.find(instance, '.clothing-group .product-thumbnail-carousel');

      expect(results.length).toEqual(1);
    });

    it('should render color swatches', function () {
      var results = ReactTestUtils.find(instance, '.clothing-group .colors');

      expect(results.length).toEqual(1);
    });

    it('renders the clothing group icon', function () {
      var results = ReactTestUtils.find(instance, '.clothing-group .clothing-group-icon img');

      expect(results[0].src).toContain('/images/capsuling/clothingGroups/top_blouse.jpg');
    });
  });
});
