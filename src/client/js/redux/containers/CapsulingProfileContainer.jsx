import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import CapsulingProfile from '../../components/CapsulingProfile';
import capsulingProfileActionCreators from '../actions/capsulingProfileActionCreators';

import userActions from 'mx_common/client/redux/actions/userActionCreators';

export class CapsulingProfileContainer extends React.Component {
  static get propTypes() {
    return {
      userActions: React.PropTypes.object,
      capsulingProfileActionCreators: React.PropTypes.object
    };
  }

  render() {
    return (
      <CapsulingProfile ref='capsulingProfile'
        {...this.props}
        {...this.props.userActions}
        {...this.props.capsulingProfileActionCreators}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    capsulingProfileActionCreators: bindActionCreators(capsulingProfileActionCreators, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: _.result(state.getIn(['user']), 'toJS'),
    signInModalShowing: state.getIn(['signInModalOverlay', 'isShowing']) || false,
    capsulingProfile: _.result(state.getIn(['capsulingProfile']), 'toJS'),
    userLoadStatus: _.result(state.getIn(['userLoadStatus']), 'toString')
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsulingProfileContainer);
