import React from 'react';
import CapsulingBrands from '../../../../src/client/js/components/CapsulingBrands';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Brands', function () {
  var instance, brands;

  beforeEach(function () {
    brands = [
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
  });

  describe('#render not signed in scenario', () => {
    beforeEach(() => {
      var user = {
        firstName: null
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingBrands
          brands={brands}
          user={user}/>);

    });
  });

  describe('#render signed in scenario', () => {
    beforeEach(() => {
      var user = {
        uid: 123456789,
        firstName: 'Joe'
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingBrands
          brands={brands}
          user={user}/>);
    });

    it('renders only 1 checkbox group', () => {
      var checkboxesGroup = ReactTestUtils.find(instance, '.checkbox-group');

      expect(checkboxesGroup.length).toBe(1);
    });

    describe('#updateNextButtonState', () => {
      it('enables the button', () => {
        instance.setState({
          selectedBrands: [
            'someBrand'
          ]
        });
        instance.updateNextButtonState(true);
        expect(instance.state.brandsNextClassNames).toEqual('next-button button');
      });

      it('disables the button has empty brands', () => {
        instance.setState({
          selectedBrands: []
        });
        instance.updateNextButtonState(false);
        expect(instance.state.brandsNextClassNames).toEqual('next-button button disabled');
      });
    });

    describe('#onBrandsChange', () => {
      it('should add a brand if checkbox is checked', function () {
        var event = {
          target: {
            value: 'INC',
            checked: true
          }
        };

        instance.setState({
          selectedBrands: ['Alfani']
        });

        instance.onBrandsChange(event);

        expect(instance.state.selectedBrands.indexOf('INC') > -1).toEqual(true);
        expect(instance.state.selectedBrands.indexOf('Alfani') > -1).toEqual(true);

      });

      it('should add a brand when selectedBrands is null', function () {
        var event = {
          target: {
            value: 'INC',
            checked: true
          }
        };

        instance.setState({selectedBrands: null});

        instance.onBrandsChange(event);

        expect(instance.state.selectedBrands.indexOf('INC') > -1).toEqual(true);
      });

      it('should remove a brand if checkbox is unchecked', function () {
        var event = {
          target: {
            value: 'INC',
            checked: false
          }
        };

        instance.setState({
          selectedBrands: ['INC']
        });

        instance.onBrandsChange(event);

        expect(instance.state.selectedBrands.indexOf('INC') > -1).toEqual(false);
      });
    });

    describe('#componentWillReceiveProps', () => {
      it('updates the state from the capsulingProfile nextProps', () => {
        var nextProps = {
          capsulingProfile: {
            selectedBrands: [
              'Alfani',
              'INC'
            ]
          }
        };

        spyOn(instance, 'updateNextButtonState');
        instance.componentWillReceiveProps(nextProps);
        expect(instance.state.selectedBrands).toEqual([
          'Alfani',
          'INC'
        ]);
        expect(instance.updateNextButtonState).toHaveBeenCalledWith(true);
      });
    });
  });
});

