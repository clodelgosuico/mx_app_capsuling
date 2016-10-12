import React from 'react';
import CapsulingResultsColorSwatches from '../../../../src/client/js/components/CapsulingResultsColorSwatches';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Results Color Swatches Spec', function () {
  var instance, colors;

  describe('#render', function () {
    beforeEach(function () {
      colors = ['#000', '#222'];

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingResultsColorSwatches colors={colors} />
      );
    });

    it('renders clothing group data', function () {
      var results = ReactTestUtils.find(instance, '.colors li');

      expect(results[0].style.backgroundColor).toEqual('rgb(0, 0, 0)');
      expect(results[1].style.backgroundColor).toEqual('rgb(34, 34, 34)');
      expect(results.length).toEqual(2);
    });
  });

  describe('#render', function () {
    beforeEach(function () {
      colors = null;

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingResultsColorSwatches colors={colors} />
      );
    });

    it('renders no li when a null object is sent', function () {
      var results = ReactTestUtils.find(instance, '.colors li');

      expect(results.length).toEqual(0);
    });
  });
});
