import React from 'react';
import _ from 'lodash';

class CapsulingResultsColorSwatches extends React.Component {
  static get propTypes() {
    return {
      colors: React.PropTypes.array
    };
  }

  render() {

    if (_.isEmpty(this.props.colors)) {
      return (
        <ul className='colors'>
          </ul>
      );
    }

    return (
      <ul className='colors'>
        {
          Object.keys(this.props.colors).map((i) => {
            return (
              <li key={'colors-' + this.props.colors[i] + i} style={{backgroundColor: this.props.colors[i]}}>
                <span>{this.props.colors[i]}</span></li>
            );
          })
        }
      </ul>
    );
  }
}

export default CapsulingResultsColorSwatches;
