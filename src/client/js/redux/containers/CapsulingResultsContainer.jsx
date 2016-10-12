import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import CapsulingResults from '../../components/CapsulingResults';
import capsulingResultsActionCreators from '../actions/capsulingResultsActionCreators';
import capsulingProfileActionCreators from '../actions/capsulingProfileActionCreators';

import userActions from 'mx_common/client/redux/actions/userActionCreators';
import pdpActions from 'mx_common/client/redux/actions/pdpActionCreators';

export class CapsulingResultsContainer extends React.Component {
  static get propTypes() {
    return {
      userActions: React.PropTypes.object,
      capsulingResultsActionCreators: React.PropTypes.object,
      capsulingProfileActionCreators: React.PropTypes.object,
      suggestedItems: React.PropTypes.object,
      pdpActions: React.PropTypes.object,
      pdpOverlayShowing: React.PropTypes.bool,
      pdpOverlayProductId: React.PropTypes.number,
      pdpOverlayColor: React.PropTypes.string
    };
  }

  render() {
    return (
      <CapsulingResults ref='capsulingResults'
        {...this.props}
        {...this.props.userActions}
        {...this.props.capsulingResultsActionCreators}
        {...this.props.capsulingProfileActionCreators}
        {...this.props.pdpActions} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    capsulingResultsActionCreators: bindActionCreators(capsulingResultsActionCreators, dispatch),
    capsulingProfileActionCreators: bindActionCreators(capsulingProfileActionCreators, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    pdpActions: bindActionCreators(pdpActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: _.result(state.getIn(['user']), 'toJS'),
    signInModalShowing: state.getIn(['signInModalOverlay', 'isShowing']) || false,
    capsulingProfile: _.result(state.getIn(['capsulingProfile']), 'toJS'),
    wardrobe: _.result(state.getIn(['wardrobe']), 'toJS'),
    userLoadStatus: _.result(state.getIn(['userLoadStatus']), 'toString'),
    suggestedItems: _.result(state.getIn(['suggestedItems']), 'toJS'),
    pdpOverlayShowing: state.getIn(['pdpOverlay', 'isShowing']) || false,
    pdpOverlayProductId: state.getIn(['pdpOverlay', 'productId']),
    pdpOverlayColor: state.getIn(['pdpOverlay', 'color'])
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsulingResultsContainer);
