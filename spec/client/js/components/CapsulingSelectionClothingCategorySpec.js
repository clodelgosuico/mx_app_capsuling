import React from 'react';
import CapsulingSelectionClothingCategory
  from '../../../../src/client/js/components/CapsulingSelectionClothingCategory';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Selection Clothing Category', function () {
  var instance,
    topLayer = [
      {
        'id': 'cgp:f:blazer',
        'name': 'Blazer',
        'category_id': 'cct:f:top_layers',
        'color_index': null,
        'glossary': 'A staple of professional attire, ' +
          'but variations can be worn more casually over nearly any top.'
      }],
    selectedCategories = [];

  beforeEach(function () {
    instance = ReactTestUtils.renderIntoDocument(<
        CapsulingSelectionClothingCategory
          clothingCategoryName='top layers'
          clothingGroup={topLayer}
          clothingCategoryId='top-layers'
          selectedCategories={selectedCategories}
        />
    );
  });

  describe('#render', function () {
    it('renders the h2 with the clothing category', () => {
      var header = ReactTestUtils.find(instance, 'h2')[0];

      expect(header.innerText).toBe('top layers');
    });

    it('renders the clothing groups', function () {
      var group = ReactTestUtils.findRenderedDOMComponentWithId(instance, 'top-layers');

      expect(group).toBeDefined();
    });
  });
});
