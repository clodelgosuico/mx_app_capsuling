import React from 'react';
import CapsulingColors from '../../../../src/client/js/components/CapsulingColors';
import ReactTestUtils from 'react-testutils-additions';
import _ from 'lodash';

describe('Capsuling Colors', function () {
  var instance;

  beforeEach(function () {
    instance = ReactTestUtils.renderIntoDocument(<CapsulingColors />);
  });

  describe('#render', function () {

    it('render the color selected group', function () {
      var colorTabs = ReactTestUtils.find(instance, '.colors-group-types .color-selected-group');

      expect(colorTabs.length).toBe(3);
    });

    it('render color group ', function () {
      var colorGroups = ReactTestUtils.find(instance, '.color-group');

      expect(colorGroups.length).toBe(3);
    });

    it('render neutrals color group by default', function () {
      var colorTab = ReactTestUtils.find(instance, '.colors-group-types .color-selected-group.active .section-title');

      expect(colorTab[0].innerText).toContain('Neutrals');
    });

    it('render the next button as disabled', function () {
      var nextButton = ReactTestUtils.find(instance, '.next-button.disabled');

      expect(nextButton.length).toBe(1);
    });
  });

  describe('state changes', function () {
    it('should set correct active color type group', function () {
      var colorTab;

      instance.onColorTypeChange('main');
      colorTab = ReactTestUtils.find(instance, '.colors-group-types .color-selected-group.active .section-title');
      expect(colorTab[0].innerText).toContain('Main');
    });

    it('should set next button state to active when atleast one color is selected from each group', function () {
      var nextButton;

      instance.updateNextButtonState({
        neutral: [
          {hex: '#000', selected: true},
          {hex: '#fff', selected: false}
        ],
        main: [
          {hex: '#fff', selected: true},
          {hex: '#000', selected: false}
        ],
        accent: [
          {hex: '#fff', selected: true},
          {hex: '#000', selected: false}
        ]
      });
      nextButton = ReactTestUtils.find(instance, '.next-button.disabled');
      expect(nextButton.length).toBe(0);
    });

  });

  it('should set selected state of a passed hex to true', function () {
    var blackNeutral;

    instance.onColorSelect('#000', 'neutral');
    blackNeutral = _.find(instance.state.colorPalette.neutral, {hex: '#000'});
    expect(blackNeutral.selected).toBeTruthy();
  });

  describe('prepareColorPalette', function () {
    it('should transform the color palette', function () {
      var input = {
        neutral: [
          {hex: '#000', name: 'black', mName: 'Black', selected: true},
          {hex: '#fff', name: 'white', mName: 'White', selected: false}
        ],
        main: [
          {hex: '#fff', name: 'white', mName: 'White', selected: true},
          {hex: '#000', name: 'black', mName: 'Black', selected: false}
        ],
        accent: [
          {hex: '#fff', name: 'white', mName: 'White', selected: true},
          {hex: '#000', name: 'black', mName: 'Black', selected: false}
        ]
      };

      expect(instance.prepareColorPalette(input)).toEqual({
        neutral: [
          'black'
        ],
        main: [
          'white'
        ],
        accent: [
          'white'
        ]
      });
    });
  });

  describe('filterSelectedName', function () {
    it('should filter the selected Name', function () {
      var input = [
        {hex: '#000', name: 'black', mName: 'Black', selected: true},
        {hex: '#fff', name: 'white', mName: 'White', selected: false}
      ];

      expect(instance.filterSelectedName(input)).toEqual([
        'black'
      ]);
    });
  });

  describe('mergeStateAndNextProps', function () {
    it('should merge the next props from the database with the state', function () {
      var nextProps = {
        neutral: [
          'black'
        ],
        main: [
          'white'
        ],
        accent: [
          'white'
        ]
      };
      var state = {
        neutral: [
          {
            'hex': '#000',
            'name': 'black',
            'mName': 'Black',
            'selected': false
          },
          {
            'hex': '#525252',
            'name': 'grey',
            'mName': 'Grey',
            'selected': false
          }
        ],
        main: [
          {
            'hex': '#999999',
            'name': 'charcoal',
            'mName': 'Charcoal',
            'selected': false
          },
          {
            'hex': '#fff',
            'name': 'white',
            'mName': 'White',
            'selected': false
          }
        ],
        accent: [
          {
            'hex': '#fff',
            'name': 'white',
            'mName': 'White',
            'selected': false
          },
          {
            'hex': '#444',
            'name': 'grey',
            'mName': 'Grey',
            'selected': false
          }
        ]
      };

      expect(instance.mergeStateAndNextProps(state, nextProps)).toEqual({
        neutral: [
          {
            'hex': '#000',
            'name': 'black',
            'mName': 'Black',
            'selected': true
          },
          {
            'hex': '#525252',
            'name': 'grey',
            'mName': 'Grey',
            'selected': false
          }
        ],
        main: [
          {
            'hex': '#999999',
            'name': 'charcoal',
            'mName': 'Charcoal',
            'selected': false
          },
          {
            'hex': '#fff',
            'name': 'white',
            'mName': 'White',
            'selected': true
          }
        ],
        accent: [
          {
            'hex': '#fff',
            'name': 'white',
            'mName': 'White',
            'selected': true
          },
          {
            'hex': '#444',
            'name': 'grey',
            'mName': 'Grey',
            'selected': false
          }
        ]
      });
    });
  });

});

