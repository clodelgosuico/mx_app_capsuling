import '../../css/main.scss';

import React from 'react';
import OptionSelectionGroup from 'mx_common/client/components/ui/OptionSelectionGroup';
import OptionSelection from 'mx_common/client/components/ui/OptionSelection';
import CapsulingProfileProgressBar from './CapsulingProfileProgressBar';
import _ from 'lodash';

class CapsulingSizing extends React.Component {
  static get propTypes() {
    return {
      saveCapsulingProfile: React.PropTypes.func,
      user: React.PropTypes.object,
      capsulingProfile: React.PropTypes.object,
      goToNext: React.PropTypes.func,
      goToPrev: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedClothes: this.props.capsulingProfile ? this.props.capsulingProfile.clothingSize : null,
      selectedShoes: this.props.capsulingProfile ? this.props.capsulingProfile.shoeSize : null
    };
    this.onClothesSizeChange = this.onClothesSizeChange.bind(this);
    this.onShoeSizeChange = this.onShoeSizeChange.bind(this);
    this.handleGotoNextStep = this.handleGotoNextStep.bind(this);
  }

  componentDidMount() {
    this.updateNextButtonState();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.capsulingProfile)) {
      this.setState({
        selectedClothes: _.isEmpty(nextProps.capsulingProfile.clothingSize) ?
          null : nextProps.capsulingProfile.clothingSize,
        selectedShoes: _.isEmpty(nextProps.capsulingProfile.shoeSize) ?
          null : nextProps.capsulingProfile.shoeSize
      }, function () {
        this.updateNextButtonState();
      }.bind(this));
    }
  }

  updateNextButtonState() {
    if (this.state.selectedShoes !== null && this.state.selectedClothes !== null) {
      this.setState({nextButtonClasses: 'next-button button'});
    } else {
      this.setState({nextButtonClasses: 'next-button button disabled'});
    }
  }

  onClothesSizeChange(e) {
    this.setState({selectedClothes: e.target.value}, function () {
      this.updateNextButtonState();
    });
  }

  onShoeSizeChange(e) {
    this.setState({selectedShoes: e.target.value}, function () {
      this.updateNextButtonState();
    });
  }

  handleGotoNextStep(e) {
    e.preventDefault();
    if (this.state.nextButtonClasses.indexOf('disabled') === -1) {
      this.props.saveCapsulingProfile(null, {
        clothingSize: this.state.selectedClothes,
        shoeSize: this.state.selectedShoes
      }, function () {
        this.props.goToNext();
      }.bind(this));
    }
  }

  render() {
    var clothingChecked = function (value) {
      return this.state.selectedClothes === value ? 'checked' : null;
    }.bind(this);

    var shoesChecked = function (value) {
      return this.state.selectedShoes === value ? 'checked' : null;
    }.bind(this);

    return (
      <div id='capsuling-sizing' className='capsuling-profile'>

        <section>
          <h2 className='top'>Simplified sizing</h2>

          <h3>Select your sizes below to find pieces that fit your needs.</h3>
        </section>

        <section>
          <h2>Clothes</h2>
          <OptionSelectionGroup name='clothes' type='radio' id='clothes' onChange={this.onClothesSizeChange}>
            <OptionSelection
              value='Petites'
              checked={clothingChecked('Petites')}
              className={clothingChecked('Petites')}>
              <span>petite</span>
            </OptionSelection>
            <OptionSelection
              value='Regular'
              checked={clothingChecked('Regular')}
              className={clothingChecked('Regular')}>
              <span>regular</span>
            </OptionSelection>
            <OptionSelection
              value='Plus Sizes'
              checked={clothingChecked('Plus Sizes')}
              className={clothingChecked('Plus Sizes')}>
              <span>plus</span>
            </OptionSelection>
          </OptionSelectionGroup>
        </section>

        <section>
          <h2>Shoes</h2>
          <OptionSelectionGroup name='shoes' type='radio' id='shoes' onChange={this.onShoeSizeChange}>
            <OptionSelection
              radioClassName='shoesRadio'
              value='Narrow'
              checked={shoesChecked('Narrow')}
              className={shoesChecked('Narrow')}>
              <span>narrow</span>
            </OptionSelection>
            <OptionSelection
              radioClassName='shoesRadio'
              value='Medium'
              checked={shoesChecked('Medium')}
              className={shoesChecked('Medium')}>
              <span>medium</span>
            </OptionSelection>
            <OptionSelection
              radioClassName='shoesRadio'
              value='Wide'
              checked={shoesChecked('Wide')}
              className={shoesChecked('Wide')}>
              <span>wide</span>
            </OptionSelection>
          </OptionSelectionGroup>
        </section>

        <ul className='button-group'>
          <li>
            <div className='next'>
              <a className='prev-button button' onClick={this.props.goToPrev}>back</a>
              <a className={this.state.nextButtonClasses} onClick={this.handleGotoNextStep}>next</a></div>
          </li>
          <li className='progress-bar-wrapper'><CapsulingProfileProgressBar currentStep={1} /></li>
        </ul>

      </div>
    );
  }
}

export default CapsulingSizing;
