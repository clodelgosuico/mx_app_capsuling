import capsulingResultsActions from '../actions/capsulingResultsActions';
import Immutable from 'immutable';

function initCapsulingResultsReducer(state) {
  let newState = state;

  if (!newState) {
    newState = Immutable.fromJS({});
  }

  if (!newState.hasIn(['wardrobe'])) {
    newState = newState.merge(newState, {
      wardrobe: null
    });
  }

  return newState;
}

function capsulingResultsReducer(state, action) {
  var newState = initCapsulingResultsReducer(state);

  if (action.type === capsulingResultsActions.RECEIVED_WARDROBE) {
    newState = newState.updateIn(['wardrobe'], () => Immutable.fromJS(action.data));
  }

  return newState;
}

function initSuggestedItemsReducer(state) {
  let newState = state;

  if (!newState) {
    newState = Immutable.fromJS({});
  }

  if (!newState.hasIn(['suggestedItems'])) {
    newState = newState.merge(newState, {
      suggestedItems: {}
    });
  }

  return newState;
}

function suggestedItemsDataLoadReducer(state, action) {
  var newState = initSuggestedItemsReducer(state);

  if (action.type === capsulingResultsActions.RECEIVED_SUGGESTED_ITEMS) {
    newState = newState.updateIn(['suggestedItems', action.data.key], () => Immutable.fromJS(action.data.results));
  }

  return newState;
}

export default {
  capsulingResultsReducer,
  suggestedItemsDataLoadReducer
};

