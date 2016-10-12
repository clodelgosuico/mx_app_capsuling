import '../../css/main.scss';

import React from 'react';
import OptionSelectionGroup from 'mx_common/client/components/ui/OptionSelectionGroup';
import OptionSelection from 'mx_common/client/components/ui/OptionSelection';
import CapsulingProfileProgressBar from './CapsulingProfileProgressBar';
import _ from 'lodash';

class CapsulingBudget extends React.Component {
  static get propTypes() {
    return {
      saveCapsulingProfile: React.PropTypes.func,
      user: React.PropTypes.object,
      capsulingProfile: React.PropTypes.object,
      goToNext: React.PropTypes.func,
      goToPrev: React.PropTypes.func
    };
  }

  static budgetHelpText(value) {
    switch (value) {
      case '$':
        return 'I prefer to wear sale or low-cost items.';
      case '$$':
        return 'I\'m comforable spending on items I love.';
      case '$$$':
        return 'I don\'t mind spending more to look my best.';
    }

    return '';
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedBudget: this.props.capsulingProfile ? this.props.capsulingProfile.budget : null,
      nextButtonClasses: 'next-button button disabled'
    };
    this.onBudgetSelectionChange = this.onBudgetSelectionChange.bind(this);
    this.handleGotoNextStep = this.handleGotoNextStep.bind(this);
  }

  componentDidMount() {
    this.updateNextButtonState();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.capsulingProfile)) {
      this.setState({
        selectedBudget: _.isEmpty(nextProps.capsulingProfile.budget) ? null : nextProps.capsulingProfile.budget
      }, function () {
        this.updateNextButtonState();
      }.bind(this));
    }
  }

  updateNextButtonState() {
    if (!_.isEmpty(this.state.selectedBudget)) {
      this.setState({nextButtonClasses: 'next-button button'});
    } else {
      this.setState({nextButtonClasses: 'next-button button disabled'});
    }
  }

  onBudgetSelectionChange(e) {
    this.setState({selectedBudget: e.target.value}, function () {
      this.updateNextButtonState();
    });
  }

  handleGotoNextStep(e) {
    e.preventDefault();
    if (this.state.nextButtonClasses.indexOf('disabled') === -1) {
      this.props.saveCapsulingProfile(null, {
        budget: this.state.selectedBudget
      }, function () {
        this.props.goToNext();
      }.bind(this));
    }
  }

  render() {
    var budgetChecked = function (value) {
      return this.state.selectedBudget === value ? 'checked' : null;
    }.bind(this);

    return (
      <div id='capsuling-budget' className='capsuling-profile'>

        <section>
          <h2 className='top'>Budget-friendly buys</h2>

          <h3>Select the average price you want to spend per item.</h3>
        </section>

        <section>
          <OptionSelectionGroup name='budget' type='radio' id='budget' onChange={this.onBudgetSelectionChange}>
            <OptionSelection
              value='$'
              checked={budgetChecked('$')}
              className={budgetChecked('$')}>
              <span>$</span>
            </OptionSelection>
            <OptionSelection
              value='$$'
              checked={budgetChecked('$$')}
              className={budgetChecked('$$')}>
              <span>$$</span>
            </OptionSelection>
            <OptionSelection
              value='$$$'
              checked={budgetChecked('$$$')}
              className={budgetChecked('$$$')}>
              <span>$$$</span>
            </OptionSelection>
          </OptionSelectionGroup>
        </section>

        <section>
          <div className='budget-help-text'>{CapsulingBudget.budgetHelpText(this.state.selectedBudget)}</div>
        </section>

        <ul className='button-group'>
          <li>
            <div className='next'><a className='prev-button button' onClick={this.props.goToPrev}>back</a>
              <a className={this.state.nextButtonClasses} onClick={this.handleGotoNextStep}>next</a></div>
          </li>
          <li className='progress-bar-wrapper'><CapsulingProfileProgressBar currentStep={3}/></li>
        </ul>
      </div>
    );
  }
}

export default CapsulingBudget;
