import React from 'react';
import ReactTestUtils from 'react-testutils-additions';
import Immutable from 'immutable';
import { createStore } from 'redux';

import { CapsulingResultsContainer, __RewireAPI__ as CapsulingResultsContainerRewire }
  from '../../../../../src/client/js/redux/containers/CapsulingResultsContainer';

describe('capsuling results container', function () {
  let instance, store;
  const initialState = Immutable.fromJS({});

  beforeEach(function () {

    this.connectSpy = jasmine.createSpy('connect').and.returnValue(() => null);
    this.dispatchSpy = jasmine.createSpy('dispatch');
    this.loadCapsulingProfileSpy = jasmine.createSpy('loadCapsulingProfile');

    store = createStore(function () {
      return initialState;
    });

    CapsulingResultsContainerRewire.__Rewire__('connect', this.connectSpy);

    instance = ReactTestUtils.renderIntoDocument(
      <CapsulingResultsContainer store={store} dispatch={this.dispatchSpy}
                                 loadCapsulingProfile={this.loadCapsulingProfileSpy}/>);
  });

  afterEach(function () {
    CapsulingResultsContainerRewire.__ResetDependency__('CapsulingResults');
    CapsulingResultsContainerRewire.__ResetDependency__('connect');
  });

  it('displays capsuling results component', function () {
    expect(instance.refs.capsulingResults).toBeDefined();
  });

  it('mapStateToProps returns object with props from the state', function () {
    var props = CapsulingResultsContainerRewire.__get__('mapStateToProps')(initialState);

    expect(props).toEqual({
      user: undefined,
      signInModalShowing: false,
      capsulingProfile: undefined,
      wardrobe: undefined,
      userLoadStatus: undefined,
      suggestedItems: undefined,
      pdpOverlayShowing: false,
      pdpOverlayProductId: undefined,
      pdpOverlayColor: undefined
    });
  });

  it('mapDispatchToProps returns capsuling results action creators object', function () {
    var props = CapsulingResultsContainerRewire.__get__('mapDispatchToProps')(this.dispatchSpy);

    expect(props.capsulingResultsActionCreators).toBeDefined();
  });
});
