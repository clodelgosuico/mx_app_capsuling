import React from 'react';
import CapsulingColorsSelectedGroup from '../../../../src/client/js/components/CapsulingColorSelectedGroup';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Color Selected Group', function () {
  var instance, onColorTypeChange;

  beforeEach(function () {
    onColorTypeChange = jasmine.createSpy('onColorTypeChange');
  });

  describe('One Selected Color and Active is True', function () {
    beforeEach(function () {
      var isActive = true;

      instance = ReactTestUtils.renderIntoDocument(<CapsulingColorsSelectedGroup
        isActive={isActive}
        title='test'
        onColorTypeChange={onColorTypeChange}
        selectedColorList={[{hex: '#000', selected: true}]}
        />);
    });

    it('should render the current active color group tab as active', function () {
      expect(ReactTestUtils.find(instance, '.color-selected-group.active').length).toBe(1);
    });

    it('render the selected color and two unselected color containers', function () {
      var colorSwatch = ReactTestUtils.find(instance, '.colors-selections div');

      expect(colorSwatch[0].style.cssText).toContain('background-color: rgb(0, 0, 0)');
      expect(colorSwatch[1].style.cssText).toContain('background-color: rgb(255, 255, 255)');
      expect(colorSwatch[2].style.cssText).toContain('background-color: rgb(255, 255, 255)');
    });
  });

  describe('None Selected Colors', function () {
    beforeEach(function () {
      var isActive = false;

      instance = ReactTestUtils.renderIntoDocument(<CapsulingColorsSelectedGroup
        isActive={isActive}
        title='test'
        onColorTypeChange={onColorTypeChange}
        selectedColorList={[]}
        />);
    });

    it('should not render the current active color group tab as active', function () {
      expect(ReactTestUtils.find(instance, '.color-selected-group.active').length).toBe(0);
    });

    it('should not render any selected colors', function () {
      var colorSwatch = ReactTestUtils.find(instance, '.colors-selections div');

      expect(colorSwatch[0].style.cssText).toContain('background-color: rgb(255, 255, 255)');
      expect(colorSwatch[1].style.cssText).toContain('background-color: rgb(255, 255, 255)');
      expect(colorSwatch[2].style.cssText).toContain('background-color: rgb(255, 255, 255)');
    });

    it('on color type change ', function () {
      var colorTypeTitle = ReactTestUtils.find(instance, '.section-title')[0];

      ReactTestUtils.Simulate.click(colorTypeTitle);
      expect(onColorTypeChange).toHaveBeenCalled();
    });
  });

  describe('Three Selected Colors', function () {
    beforeEach(function () {
      var isActive = false;

      instance = ReactTestUtils.renderIntoDocument(<CapsulingColorsSelectedGroup
        isActive={isActive}
        title='test'
        onColorTypeChange={onColorTypeChange}
        selectedColorList={[{hex: '#000', selected: true},
        {hex: '#ff0000', selected: true}, {hex: '#00ff00', selected: true}]}
        />);
    });

    it('should not render title with checkmark', function () {
      expect(ReactTestUtils.find(instance, '.section-title.checked').length).toBe(1);
    });
  });
});

