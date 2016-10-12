import '../../css/main.scss';

import React from 'react';

class CapsulingProfileProgressBar extends React.Component {
  static get propTypes() {
    return {
      currentStep: React.PropTypes.number
    };
  }

  constructor(props) {
    super(props);
  }

  calculateClassName(currentStep, step) {
    if (currentStep > step) {
      return 'completed';
    } else if (currentStep === step) {
      return 'active';
    }
    return 'incomplete';
  }

  render() {
    return (
      <div className='progress-scale'>
        <ul className='scale-entries'>
          <li data-value='1' className={this.calculateClassName(this.props.currentStep, 0)}>
            <div><span></span></div>
            <hr />
            </li>
            <li data-value='2' className={this.calculateClassName(this.props.currentStep, 1)}>
              <div><span></span></div>
              <hr />
              </li>
              <li data-value='3' className={this.calculateClassName(this.props.currentStep, 2)}>
                <div><span></span></div>
                <hr />
              </li>
              <li data-value='4' className={this.calculateClassName(this.props.currentStep, 3)}>
                <div><span></span></div>
                <hr />
              </li>
              <li data-value='5' className={this.calculateClassName(this.props.currentStep, 4)}>
                <div><span></span></div>
              </li>
          </ul>
      </div>
    );
  }
}
export default CapsulingProfileProgressBar;
