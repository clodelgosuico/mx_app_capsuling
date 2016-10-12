import React from 'react';
import CapsulingBudget from '../../../../src/client/js/components/CapsulingBudget';
import ReactTestUtils from 'react-testutils-additions';

describe('Capsuling Budget', function () {
  var instance, user, saveCapsulingProfileSpy, goToNextSpy, goToPrevSpy;

  beforeEach(function () {
    saveCapsulingProfileSpy = jasmine.createSpy('saveCapsulingProfileSpy')
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
        budget: '$$'
      };

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingBudget
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
        var radioElement = ReactTestUtils.find(instance, '.radio-group#budget .radio label :radio[name=budget]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=budget]');
        expect(radioElement[0].value).toEqual('$');
        expect(radioElement[1].value).toEqual('$$');
        expect(radioElement[2].value).toEqual('$$$');

        radioElement = ReactTestUtils.find(instance, '.radio-group#budget .radio label :radio:checked');
        expect(radioElement.length).toBe(1);
        expect(radioElement[0].value).toBe('$$');
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
        <CapsulingBudget
          user={user}
          saveCapsulingProfile={saveCapsulingProfileSpy}
          goToNext={goToNextSpy}
          goToPrev={goToPrevSpy} />
      );
    });

    describe('#render', function () {
      it('renders budget radio elements', function () {
        var radioElement = ReactTestUtils.find(instance, '.radio-group#budget .radio label :radio[name=budget]');

        expect(radioElement.length).toBe(3);
        radioElement = ReactTestUtils.find(instance, '.radio-group .radio label :radio[name=budget]');
        expect(radioElement[0].value).toEqual('$');
        expect(radioElement[1].value).toEqual('$$');
        expect(radioElement[2].value).toEqual('$$$');
      });

      it('renders the next button is disabled', function () {
        var link = ReactTestUtils.find(instance, '.next-button.disabled');

        expect(link.length).toBe(1);
      });

      it('no help text is shown by default', function () {
        expect(ReactTestUtils.find(instance, '.budget-help-text')[0].innerText).toBe('');
      });
    });
  });

  describe('choosing a budget', function () {
    beforeEach(function () {
      var budgetRadios;

      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingBudget
          user={user}
          saveCapsulingProfile={saveCapsulingProfileSpy}
          goToNext={goToNextSpy}
          goToPrev={goToPrevSpy} />
      );

      budgetRadios = ReactTestUtils.find(instance, 'input[type="radio"][name="budget"]');
      ReactTestUtils.Simulate.change(budgetRadios[1]);
    });

    it('enables the next button', function () {
      expect(ReactTestUtils.find(instance, '.next-button.disabled').length).toBe(0);
      expect(ReactTestUtils.find(instance, '.next-button').length).toBe(1);
    });

    it('clicking the next button calls save and calls go to next function', function () {
      var nextButton = ReactTestUtils.find(instance, '.next-button')[0];

      ReactTestUtils.Simulate.click(nextButton);
      expect(saveCapsulingProfileSpy).toHaveBeenCalledWith(null, {'budget': '$$'}, jasmine.any(Function));
      expect(goToNextSpy).toHaveBeenCalled();
    });

    it('clicking the previous button calls go to prev function ', function () {
      var prevButton = ReactTestUtils.find(instance, '.prev-button')[0];

      ReactTestUtils.Simulate.click(prevButton);
      expect(goToPrevSpy).toHaveBeenCalled();
    });
  });
});

