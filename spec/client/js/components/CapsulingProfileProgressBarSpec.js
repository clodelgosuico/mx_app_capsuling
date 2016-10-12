import React from 'react';
import CapsulingProfileProgressBar from '../../../../src/client/js/components/CapsulingProfileProgressBar';
import ReactTestUtils from 'react-testutils-additions';

describe('CapsulingProfileProgressBar', function () {
  var instance;

  describe('#render', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(<CapsulingProfileProgressBar currentStep={2} />);
    });

    it('render 2 completed steps if current step is 3 out of 5 steps', function () {
      expect(ReactTestUtils.find(instance, '.progress-scale .scale-entries .completed').length).toBe(2);
    });

    it('render 2 incomplete steps if current step is 3 out of 5 steps', function () {
      expect(ReactTestUtils.find(instance, '.progress-scale .scale-entries .incomplete').length).toBe(2);
    });
  });
});
