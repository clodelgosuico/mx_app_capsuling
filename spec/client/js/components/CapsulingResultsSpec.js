import React from 'react';
import CapsulingResults from '../../../../src/client/js/components/CapsulingResults';
import ReactTestUtils from 'react-testutils-additions';
import { browserHistory } from 'react-router';

describe('Capsuling Results', function () {
  var instance, wardrobe, user, suggestedItems, getSuggestedItems, capsulingProfile;

  beforeEach(function () {
    wardrobe = {
      'wardrobeId': '1234',
      'wardrobeItems': [
        {
          'clothingCategoryId': 'cct:f:primary_shirt',
          'clothingCategoryName': 'tops',
          'clothingGroups': [{
            'id': 693,
            'clothingGroupId': 'cgp:f:blouse',
            'defaultColorPalette': 'neutral',
            'name': 'Blouse',
            'colors': ['black', 'navy'],
            'mColors': ['Black', 'Blue'],
            'hexColors': ['#000', '#123']
          }, {
            'id': 694,
            'clothingGroupId': 'cgp:f:blouse',
            'defaultColorPalette': 'main',
            'name': 'Blouse',
            'colors': ['blue', 'green', 'yellow'],
            'mColors': ['Blue', 'Green', 'Yellow'],
            'hexColors': ['#000', '#111', '#222']
          }]
        }, {
          'clothingCategoryId': 'cct:f:pants',
          'clothingCategoryName': 'bottoms',
          'clothingGroups': [{
            'id': 695,
            'clothingGroupId': 'cgp:f:active_bottoms',
            'defaultColorPalette': 'neutral',
            'name': 'Athletic Bottom',
            'colors': ['black', 'navy'],
            'mColors': ['Black', 'Blue'],
            'hexColors': ['#000', '#123']
          }]
        }, {
          'clothingCategoryId': 'cct:f:shoes',
          'clothingCategoryName': 'shoes',
          'clothingGroups': [{
            'id': 696,
            'clothingGroupId': 'cgp:f:active_shoe',
            'defaultColorPalette': 'fundamental',
            'name': 'Active Shoe'
          }]
        }]
    };
    user = {
      uid: 123456789,
      firstName: 'Joe'
    };
    suggestedItems = {};
    getSuggestedItems = function () {
    };
    capsulingProfile = {
      clothingSize: 'Regular',
      shoeSize: 'Medium'
    };

    spyOn(browserHistory, 'push');
  });

  describe('render', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(
        <CapsulingResults wardrobe={wardrobe} user={user}
                          suggestedItems={suggestedItems}
                          getSuggestedItems={getSuggestedItems}
                          userLoadStatus={'Ensured'}
                          capsulingProfile={capsulingProfile} />
      );
    });

    it('renders the results', function () {
      var results = ReactTestUtils.find(instance, '#capsuling-results .clothing-category');

      expect(results.length).toEqual(3);
    });

    describe('editPreferences', function () {
      it('loads the capsuling profile and navigates to profile', function (done) {
        var loadCapsulingProfile = function () {
          done();
        };

        instance = ReactTestUtils.renderIntoDocument(
          <CapsulingResults wardrobe={wardrobe} user={user} loadCapsulingProfile={loadCapsulingProfile}
                            suggestedItems={suggestedItems}
                            getSuggestedItems={getSuggestedItems}/>
        );
        spyOn(instance, 'goToLocation');
        instance.editPreferences();
        expect(instance.goToLocation).toHaveBeenCalledWith('/workwardrobe/profile');
      });
    });
  });
});
