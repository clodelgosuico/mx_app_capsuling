import React from 'react';
import CapsulingSizing from '../../../../src/client/js/components/CapsulingSizing';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Sizing', function () {
  var instance, user, saveCapsulingProfileSpy, goToNextSpy, goToPrevSpy;

  beforeEach(function () {
    saveCapsulingProfileSpy = jasmine.createSpy('saveCapsulingProfile')
      .and.callFake(function (userId, data, callback) {
        callback();
      });
    goToNextSpy = jasmine.createSpy('goToNext');
    goToPrevSpy = jasmine.createSpy('goToPrev');
    user = {
      uid: 123456789,
      firstName: 'Joe'
    };
  });

  describe('when previous profile exists', function () {
    beforeEach(function () {
      let capsulingProfile = {
        clothingSize: 'Regular',
        shoeSize: 'Medium'
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingSizing
          user={user}
          saveCapsulingProfile={saveCapsulingProfileSpy}
          goToNext={goToNextSpy}
          goToPrev={goToPrevSpy}
          capsulingProfile={capsulingProfile}
        />
      );
    });

    describe('#render', function () {
      it('renders clothes radio elements pre-selected', function () {
        var radioElement = ReactTestUtils.find(instance, '.radio-group#clothes .radio label :radio[name=clothes]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=clothes]');
        expect(radioElement[0].value).toEqual('Petites');
        expect(radioElement[1].value).toEqual('Regular');
        expect(radioElement[2].value).toEqual('Plus Sizes');

        radioElement = ReactTestUtils.find(instance, '.radio-group#clothes .radio label :radio:checked');
        expect(radioElement.length).toBe(1);
        expect(radioElement[0].value).toBe('Regular');
      });

      it('renders shoes radio elements preselected', function () {
        var radioElement = ReactTestUtils.find(instance, '.radio-group#shoes .radio label :radio[name=shoes]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=shoes]');
        expect(radioElement[0].value).toEqual('Narrow');
        expect(radioElement[1].value).toEqual('Medium');
        expect(radioElement[2].value).toEqual('Wide');

        radioElement = ReactTestUtils.find(instance, '.radio-group#shoes .radio label :radio:checked');
        expect(radioElement.length).toBe(1);
        expect(radioElement[0].value).toBe('Medium');
      });

      it('renders the next button in enabled state', function () {
        expect(ReactTestUtils.find(instance, '.next-button.disabled').length).toBe(0);
        expect(ReactTestUtils.find(instance, '.next-button').length).toBe(1);
      });
    });
  });

  describe('when previous profile does not exist', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingSizing
          user={user}
          saveCapsulingProfile={saveCapsulingProfileSpy}
          goToNext={goToNextSpy}
          goToPrev={goToPrevSpy}
        />
      );
    });

    describe('#render', function () {
      it('renders clothes radio elements with none pre-selected', function () {
        var radioElement = ReactTestUtils.find(instance, '.radio-group#clothes .radio label :radio[name=clothes]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=clothes]');
        expect(radioElement[0].value).toEqual('Petites');
        expect(radioElement[1].value).toEqual('Regular');
        expect(radioElement[2].value).toEqual('Plus Sizes');

        expect(ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=clothes]checked').length).toBe(0);
      });

      it('renders shoes radio elements with none-preselected', function () {
        var radioElement = ReactTestUtils.find(instance, '.radio-group#shoes .radio label :radio[name=shoes]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=shoes]');
        expect(radioElement[0].value).toEqual('Narrow');
        expect(radioElement[1].value).toEqual('Medium');
        expect(radioElement[2].value).toEqual('Wide');

        expect(ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=shoes]checked').length).toBe(0);
      });

      it('renders the next button in disabled state', function () {
        var link = ReactTestUtils.find(instance, '.next-button.disabled');

        expect(link.length).toBe(1);
      });
    });
  });

  describe('choosing shoes and clothing style', function () {
    beforeEach(function () {
      var clothesRadios, shoesRadios;

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingSizing
          user={user}
          saveCapsulingProfile={saveCapsulingProfileSpy}
          goToNext={goToNextSpy}
          goToPrev={goToPrevSpy}
        />
      );

      clothesRadios = ReactTestUtils.find(instance, 'input[type="radio"][name="clothes"]');
      shoesRadios = ReactTestUtils.find(instance, 'input[type="radio"][name="shoes"]');

      ReactTestUtils.Simulate.change(clothesRadios[1]);
      expect(ReactTestUtils.find(instance, '.next-button.disabled').length).toBe(1);

      ReactTestUtils.Simulate.change(shoesRadios[1]);
      expect(ReactTestUtils.find(instance, '.next-button.disabled').length).toBe(0);
    });

    it('enables the next button', function () {
      expect(ReactTestUtils.find(instance, '.next-button').length).toBe(1);
    });

    it('clicking the next button calls save and calls go to next function', function () {
      var nextButton = ReactTestUtils.find(instance, '.next-button')[0];

      ReactTestUtils.Simulate.click(nextButton);
      expect(saveCapsulingProfileSpy).toHaveBeenCalledWith(
        null,
        {'clothingSize': 'Regular', 'shoeSize': 'Medium'},
        jasmine.any(Function)
      );

      expect(goToNextSpy).toHaveBeenCalled();
    });

    it('clicking the previous button calls go to prev function ', function () {
      var prevButton = ReactTestUtils.find(instance, '.prev-button')[0];

      ReactTestUtils.Simulate.click(prevButton);
      expect(goToPrevSpy).toHaveBeenCalled();
    });
  });
});

