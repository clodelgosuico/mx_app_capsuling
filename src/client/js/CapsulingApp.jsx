import '../css/main.scss';

import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import _ from 'lodash';

import HeaderContainer from 'mx_common/client/redux/containers/HeaderContainer';
import OverlaysContainer from 'mx_common/client/redux/containers/OverlaysContainer';
import commonReducers from 'mx_common/client/redux/reducers/reducers';
import combineReducers from 'mx_common/client/redux/reducers/util/combineReducers';

import capsulingReducers from './redux/reducers/reducers';

class CapsulingApp extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element)
      ])
    };
  }

  render() {
    let reducers = _.extend({}, commonReducers, capsulingReducers);

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore),
      store = createStoreWithMiddleware(combineReducers(reducers), Immutable.fromJS({}));

    return (
      <span>
        <Provider store={store}>
          <HeaderContainer id='header'/>
        </Provider>
        <Provider store={store}>
          <div id='content'>
            {this.props.children}
          </div>
        </Provider>
        <Provider store={store}>
          <OverlaysContainer id='overlaysContainer' container={window.document.body}/>
        </Provider>
      </span>
    );
  }
}

export default CapsulingApp;
