import Immutable from 'immutable';

import capsulingProfileActions from '../../../../../src/client/js/redux/actions/capsulingProfileActions';
import capsulingProfileReducers from '../../../../../src/client/js/redux/reducers/capsulingProfileReducers';

describe('capsuling profile reducers', function () {
  describe('capsulingProfileDataLoadReducer', function () {
    it('initializes to default value if capsuling profile is undefined', function () {
      let newState = capsulingProfileReducers.capsulingProfileDataLoadReducer(undefined, {type: 'DUMMY'});

      expect(newState).toEqual(Immutable.fromJS({
        capsulingProfile: {}
      }));
    });

    it('updates state with received data', function () {
      let newState = capsulingProfileReducers.capsulingProfileDataLoadReducer(
        Immutable.fromJS({}),
        {
          type: capsulingProfileActions.RECEIVED_CAPSULING_PROFILE_DATA,
          data: {
            clothingSize: 'medium'
          }
        }
      );

      expect(newState.toJS()).toEqual({
        capsulingProfile: {
          clothingSize: 'medium'
        }
      });
    });

    it('merges state with received data', function () {
      let newState = capsulingProfileReducers.capsulingProfileDataLoadReducer(
        Immutable.fromJS({
          capsulingProfile: {
            clothingSize: 'medium'
          }
        }),
        {
          type: capsulingProfileActions.RECEIVED_CAPSULING_PROFILE_DATA,
          data: {
            brand: 'INC'
          }
        }
      );

      expect(newState.toJS()).toEqual({
        capsulingProfile: {
          clothingSize: 'medium',
          brand: 'INC'
        }
      });
    });
  });
});
