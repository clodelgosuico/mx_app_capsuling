import React from 'react';
import ReactTestUtils from 'react-testutils-additions';
import Immutable from 'immutable';
import { createStore } from 'redux';

import { CapsulingProfileContainer, __RewireAPI__ as CapsulingProfileContainerRewire }
  from '../../../../../src/client/js/redux/containers/CapsulingProfileContainer';

describe('capsuling profile container', function () {
  let instance, store;
  const initialState = Immutable.fromJS({});

  beforeEach(function () {
    CapsulingProfileContainerRewire.__Rewire__('CapsulingSizing', React.createClass({
      render: function () {
        return (
          <div>Capsuling Sizing</div>
        );
      }
    }));

    this.connectSpy = jasmine.createSpy('connect').and.returnValue(() => null);
    this.dispatchSpy = jasmine.createSpy('dispatch');
    this.loadCapsulingProfileSpy = jasmine.createSpy('loadCapsulingProfile');

    store = createStore(function () {
      return initialState;
    });

    CapsulingProfileContainerRewire.__Rewire__('connect', this.connectSpy);

    instance = ReactTestUtils.renderIntoDocument(
      <CapsulingProfileContainer store={store} dispatch={this.dispatchSpy}
                                 loadCapsulingProfile={this.loadCapsulingProfileSpy}/>);
  });

  afterEach(function () {
    CapsulingProfileContainerRewire.__ResetDependency__('CapsulingProfile');
    CapsulingProfileContainerRewire.__ResetDependency__('connect');
  });

  it('displays capsuling profile component', function () {
    expect(instance.refs.capsulingProfile).toBeDefined();
  });

  it('mapStateToProps returns object with props from the state', function () {
    var props = CapsulingProfileContainerRewire.__get__('mapStateToProps')(initialState);

    expect(props).toEqual({
      user: undefined,
      signInModalShowing: false,
      capsulingProfile: undefined,
      userLoadStatus: undefined
    });
  });

  it('mapDispatchToProps returns capsuling profile action creators object', function () {
    var props = CapsulingProfileContainerRewire.__get__('mapDispatchToProps')(this.dispatchSpy);

    expect(props.capsulingProfileActionCreators).toBeDefined();
  });
});
