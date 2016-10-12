import capsulingProfileActions from '../actions/capsulingProfileActions';
import Immutable from 'immutable';

function initCapsulingProfileReducer(state) {
  let newState = state;

  if (!newState) {
    newState = Immutable.fromJS({});
  }

  if (!newState.hasIn(['capsulingProfile'])) {
    newState = newState.merge(newState, {
      capsulingProfile: {}
    });
  }

  return newState;
}

function capsulingProfileDataLoadReducer(state, action) {
  var newState = initCapsulingProfileReducer(state);

  if (action.type === capsulingProfileActions.RECEIVED_CAPSULING_PROFILE_DATA) {
    newState = newState.mergeIn(['capsulingProfile'], Immutable.fromJS(action.data));
  }

  return newState;
}

export default {
  capsulingProfileDataLoadReducer
};

