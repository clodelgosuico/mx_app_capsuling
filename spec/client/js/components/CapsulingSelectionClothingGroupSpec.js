import React from 'react';
import CapsulingSelectionClothingGroup from '../../../../src/client/js/components/CapsulingSelectionClothingGroup';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Selection Clothing Group', () => {
  var instance;

  beforeEach(function () {
    var topLayers = [
      {
        name: 'Blouses',
        id: 'cgp:f:blouse',
        image: 'top_blouse.jpg'
      },
      {
        name: 'Button Front',
        id: 'cgp:f:button_front',
        image: 'top_buttonfront.jpg'
      },
      {
        name: 'Polo Shirts',
        id: 'cgp:f:polo_shirt',
        image: 'top_polo.jpg'
      },
      {
        name: 'T-shirts',
        id: 'cgp:f:cotton_tshirt',
        image: 'top_tshirt.jpg'
      }
    ];

    var selectedCategories = [];

    instance = ReactTestUtils.renderIntoDocument(
      <CapsulingSelectionClothingGroup
        clothingGroup={topLayers}
        selectedCategories={selectedCategories}
        id='top-layers'/>
    );
  });

  describe('#render', () => {
    it('renders the top layers clothing group', () => {
      var checkboxes = ReactTestUtils.find(instance, '.checkbox-group .checkbox');

      expect(checkboxes.length).toBe(4);
    });

    it('renders the image thumbnails', () => {
      var firstImage = ReactTestUtils.find(instance, '.checkbox-group .checkbox img')[0];

      expect(firstImage.src).toContain('top_blouse.jpg');
    });
  });

  describe('#matchesCategory', () => {
    it('returns true when one id matches', () => {
      var selectedCategories = ['jeans'];

      expect(instance.matchesCategory(selectedCategories, 'jeans')).toBe(true);
    });
    it('returns false when one id doesn\'t match', () => {
      var selectedCategories = ['jeans'];

      expect(instance.matchesCategory(selectedCategories, 'pants')).toBe(false);
    });
    it('returns true when multiple ids matches', () => {
      var selectedCategories = ['jeans', 'trousers', 'shorts'];

      expect(instance.matchesCategory(selectedCategories, 'jeans,trousers')).toBe(true);

    });
    it('returns false when multiple ids doesn\'t match', () => {
      var selectedCategories = ['jeans', 'trousers', 'shorts'];

      expect(instance.matchesCategory(selectedCategories, 'capri,mini')).toBe(false);
    });
  });
});
