import React from 'react';
import CapsulingColorGroup from '../../../../src/client/js/components/CapsulingColorGroup';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Color Group', function () {
  var instance, onColorSelect;

  beforeEach(function () {
    onColorSelect = jasmine.createSpy('onColorSelect');
  });

  describe('#render', function () {
    beforeEach(function () {
      var isActive = true;

      instance = ReactTestUtils.renderIntoDocument(<CapsulingColorGroup
        isActive={isActive}
        colorGroupName='main'
        colorList={[{hex: '#000', selected: false}]}
        onColorSelect={onColorSelect}>
        <span id='first-child'>First</span>
        <span id='second-child'>Second</span>
        <span id='third-child'>Third</span>
      </CapsulingColorGroup>);
    });

    it('should set correct id and className to container', function () {
      expect(ReactTestUtils.find(instance, '#colors-main-group').length).toBe(1);
      expect(ReactTestUtils.find(instance, '.color-group.active').length).toBe(1);
    });

    it('should render child props', function () {
      expect(ReactTestUtils.find(instance, '#first-child').length).toBe(1);
      expect(ReactTestUtils.find(instance, '#second-child').length).toBe(1);
      expect(ReactTestUtils.find(instance, '#third-child').length).toBe(1);
    });

    it('should render the color list', function () {
      var colorSwatch = ReactTestUtils.find(instance, '.color-container div');

      expect(colorSwatch.length).toBe(1);
      expect(colorSwatch[0].style.cssText).toContain('background-color: rgb(0, 0, 0)');
    });

    it('should call onColorSelect when color swatch is clicked', function () {
      var colorSwatch = ReactTestUtils.find(instance, '.color-container div');

      ReactTestUtils.Simulate.click(colorSwatch[0]);
      expect(onColorSelect).toHaveBeenCalledWith('#000', 'main');
    });
  });

  describe('render a selected color', function () {
    beforeEach(function () {
      var isActive = true;

      instance = ReactTestUtils.renderIntoDocument(<CapsulingColorGroup
        isActive={isActive}
        colorGroupName='main'
        colorList={[{hex: '#000', selected: true},
        {hex: '#fff', selected: false}]}
        onColorSelect={onColorSelect}>
        <span id='first-child'>First</span>
        <span id='second-child'>Second</span>
        <span id='third-child'>Third</span>
      </CapsulingColorGroup>);
    });

    it('should render an selected color', function () {
      var colorSwatch = ReactTestUtils.find(instance, '.color-container.selected');

      expect(colorSwatch.length).toBe(1);
    });

  });
});
