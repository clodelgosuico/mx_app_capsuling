import React from 'react';
import CapsulingSelection from '../../../../src/client/js/components/CapsulingSelection';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Selection', function () {
  var instance, clothingGroups;

  beforeEach(function () {
    clothingGroups = [
      {
        category: 'tops',
        items: [
          {
            name: 'Blouses',
            id: 'cgp:f:blouse',
            image: 'top_blouse.jpg'
          }
        ]
      },
      {
        category: 'bottoms',
        items: [
          {
            name: 'Trousers',
            id: 'cgp:f:dress_trousers',
            image: 'bottom_trousers.jpg'
          },
          {
            name: 'Jeans',
            id: 'cgp:f:jeans',
            image: 'bottom_jeans.jpg'
          }
        ]
      },
      {
        category: 'dresses',
        items: [
          {
            name: 'Work Dresses',
            id: 'cgp:f:business_dress',
            image: 'dress_work.jpg'
          }
        ]
      },
      {
        category: 'shoes',
        items: [
          {
            name: 'Booties',
            id: 'cgp:f:booties',
            image: 'shoe_booties.pjg'
          },
          {
            name: 'Boots',
            id: 'cgp:f:boots',
            image: 'shoe_boots.jpg'
          }
        ]
      },
      {
        category: 'outerwear',
        items: [
          {
            name: 'Blazers',
            id: 'cgp:f:blazer',
            image: 'outerwear_blazers.jpg'
          }
        ]
      }
    ];
  });

  describe('#render not signed in scenario', () => {
    beforeEach(() => {
      var user = {
        firstName: null
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingSelection
          clothingGroups={clothingGroups}
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
        <CapsulingSelection
          clothingGroups={clothingGroups}
          user={user}/>);
    });

    it('only 5 sections', () => {
      var checkboxesGroup = ReactTestUtils.find(instance, '.checkbox-group');

      expect(checkboxesGroup.length).toBe(5);
    });

    describe('#updateNextButtonState', () => {
      it('enables the button', () => {
        instance.setState({
          selectedCategories: [
            'someCategory'
          ]
        });
        instance.updateNextButtonState(true);
        expect(instance.state.selectionNextClassNames).toEqual('next-button button');
      });

      it('disables the button has empty categories', () => {
        instance.setState({
          selectedCategories: []
        });
        instance.updateNextButtonState(false);
        expect(instance.state.selectionNextClassNames).toEqual('next-button button disabled');
      });
    });

    describe('#onCategoriesChange', () => {
      it('should add a category if checkbox is checked', function () {
        var event = {
          target: {
            value: 'Shoes',
            checked: true
          }
        };

        instance.setState({
          selectedCategories: ['Sandals']
        });

        instance.onCategoriesChange(event);

        expect(instance.state.selectedCategories.indexOf('Shoes') > -1).toEqual(true);
        expect(instance.state.selectedCategories.indexOf('Sandals') > -1).toEqual(true);

      });

      it('should add a category when selectedCategories is null', function () {
        var event = {
          target: {
            value: 'shoes',
            checked: true
          }
        };

        instance.setState({selectedCategories: null});

        instance.onCategoriesChange(event);

        expect(instance.state.selectedCategories.indexOf('shoes') > -1).toEqual(true);
      });

      it('should remove a category if checkbox is unchecked', function () {
        var event = {
          target: {
            value: 'Shoes',
            checked: false
          }
        };

        instance.setState({
          selectedCategories: ['Shoes']
        });

        instance.onCategoriesChange(event);

        expect(instance.state.selectedCategories.indexOf('Shoes') > -1).toEqual(false);
      });

      it('adds several ids', () => {
        var event = {
          target: {
            value: 'jumpsuits,rompers',
            checked: true
          }
        };

        instance.setState({
          selectedCategories: ['trousers']
        });

        instance.onCategoriesChange(event);

        expect(instance.state.selectedCategories.indexOf('jumpsuits') > -1).toEqual(true);
        expect(instance.state.selectedCategories.indexOf('rompers') > -1).toEqual(true);
        expect(instance.state.selectedCategories.indexOf('trousers') > -1).toEqual(true);
      });

      it('removes several ids', () => {
        var event = {
          target: {
            value: 'jumpsuits,rompers',
            checked: false
          }
        };

        instance.setState({
          selectedCategories: [
            'Shoes',
            'jumpsuits',
            'rompers'
          ]
        });

        instance.onCategoriesChange(event);

        expect(instance.state.selectedCategories.indexOf('jumpsuits') > -1).toEqual(false);
        expect(instance.state.selectedCategories.indexOf('rompers') > -1).toEqual(false);
      });
    });

    describe('#componentWillReceiveProps', () => {
      it('updates the state from the capsulingProfile nextProps', () => {
        var nextProps = {
          capsulingProfile: {
            selectedCategories: [
              'blouse',
              'trousers'
            ]
          }
        };

        spyOn(instance, 'updateNextButtonState');
        instance.componentWillReceiveProps(nextProps);
        expect(instance.state.selectedCategories).toEqual([
          'blouse',
          'trousers'
        ]);
        expect(instance.updateNextButtonState).toHaveBeenCalledWith(true);
      });
    });
  });
});

