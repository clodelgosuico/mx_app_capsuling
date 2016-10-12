import React from 'react';
import CapsulingBrandsGroup from '../../../../src/client/js/components/CapsulingBrandsGroup';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Selection Clothing Group', () => {
  var instance;

  beforeEach(function () {
    var brands = [
      {
        name: 'Alfani',
        image: 'alfani.jpg'
      },
      {
        name: 'INC',
        image: 'inc.jpg'
      },
      {
        name: 'Bar III',
        image: 'bariii.jpg'
      }
    ];

    var selectedBrands = ['INC'];

    instance = ReactTestUtils.renderIntoDocument(
      <CapsulingBrandsGroup
        brands={brands}
        selectedBrands={selectedBrands}
        id='top-layers'/>
    );
  });

  describe('#render', () => {
    it('renders the brands group', () => {
      var checkboxes = ReactTestUtils.find(instance, '.checkbox-group .checkbox');

      expect(checkboxes.length).toBe(3);
    });

    it('renders the image thumbnails', () => {
      var firstImage = ReactTestUtils.find(instance, '.checkbox-group .checkbox img')[0];

      expect(firstImage.src).toContain('alfani.jpg');
    });

    it('adds checked style when selected brand matches', () => {
      var alfani = ReactTestUtils.find(instance, '.checkbox-group .checkbox')[1];

      expect(alfani.className).toContain('checked');
    });
  });

  describe('#matchesBrand', () => {
    it('returns true when one id matches', () => {
      var selectedBrands = ['calvin klein'];

      expect(instance.matchesBrand(selectedBrands, 'calvin klein')).toBe(true);
    });
    it('returns false when one id doesn\'t match', () => {
      var selectedBrands = ['calvin klein'];

      expect(instance.matchesBrand(selectedBrands, 'polo')).toBe(false);
    });
  });
});
