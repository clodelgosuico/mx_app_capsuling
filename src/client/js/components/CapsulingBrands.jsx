import '../../css/main.scss';

import React from 'react';
import CapsulingBrandsGroup from './CapsulingBrandsGroup';
import CapsulingProfileProgressBar from './CapsulingProfileProgressBar';
import _ from 'lodash';

class CapsulingBrands extends React.Component {
  static get propTypes() {
    return {
      saveCapsulingProfile: React.PropTypes.func,
      brands: React.PropTypes.array,
      user: React.PropTypes.object,
      capsulingProfile: React.PropTypes.object,
      goToNext: React.PropTypes.func,
      goToPrev: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedBrands: this.props.capsulingProfile ? this.props.capsulingProfile.selectedBrands : []
    };
    this.onBrandsChange = this.onBrandsChange.bind(this);

    this.handleGotoNextStep = this.handleGotoNextStep.bind(this);
  }

  hasSelectedBrands() {
    return !_.isEmpty(this.state.selectedBrands);
  }

  componentDidMount() {
    this.updateNextButtonState(this.hasSelectedBrands());
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.capsulingProfile)) {
      this.setState({
        selectedBrands: _.isEmpty(nextProps.capsulingProfile.selectedBrands) ?
          [] : nextProps.capsulingProfile.selectedBrands
      }, function () {
        this.updateNextButtonState(this.hasSelectedBrands());
      }.bind(this));
    }
  }

  updateNextButtonState(hasSelectedBrands) {
    if (hasSelectedBrands) {
      this.setState({brandsNextClassNames: 'next-button button'});
    } else {
      this.setState({brandsNextClassNames: 'next-button button disabled'});
    }
  }

  onBrandsChange(e) {
    var selectedBrands = this.state.selectedBrands,
      value = e.target.value;

    if (e.target.checked) {
      if (!_.includes(selectedBrands, value)) {
        if (selectedBrands) {
          selectedBrands = selectedBrands.concat(value);
        } else {
          selectedBrands = [value];
        }
      }
    } else {
      selectedBrands.splice(this.state.selectedBrands.indexOf(value), 1);
    }
    this.setState({
      'selectedBrands': selectedBrands
    });

    this.updateNextButtonState((selectedBrands.length > 0));
  }

  handleGotoNextStep(e) {
    e.preventDefault();
    if (this.state.brandsNextClassNames.indexOf('disabled') === -1) {
      this.props.saveCapsulingProfile(null, {
        selectedBrands: this.state.selectedBrands
      }, function () {
        this.props.goToNext();
      }.bind(this));
    }
  }

  render() {
    return (
      <div id='capsuling-brands' className='capsuling-profile'>

        <section>
          <h2 className='top'>Build from brands</h2>

          <h3>Select the brands you love to wear.</h3>
        </section>

        <section>
          <CapsulingBrandsGroup
            key={this.props.brands}
            brands={this.props.brands}
            selectedBrands={this.state.selectedBrands}
            onBrandsChange={this.onBrandsChange}
            />
        </section>

        <ul className='button-group'>
          <li>
            <div className='next'><a className='prev-button button' onClick={this.props.goToPrev}>back</a> <a
              className={this.state.brandsNextClassNames} onClick={this.handleGotoNextStep}>next</a></div>
          </li>
          <li className='progress-bar-wrapper'><CapsulingProfileProgressBar currentStep={2}/></li>
        </ul>
      </div>
    );
  }
}

export default CapsulingBrands;
