import React from 'react';
import OptionSelectionGroup from 'mx_common/client/components/ui/OptionSelectionGroup';
import OptionSelection from 'mx_common/client/components/ui/OptionSelection';
import _ from 'lodash';

var gridClasses = 'small-block-grid-4';

class CapsulingBrandsGroup extends React.Component {
  static get propTypes() {
    return {
      brands: React.PropTypes.array,
      onBrandsChange: React.PropTypes.func,
      selectedBrands: React.PropTypes.array
    };
  }

  matchesBrand(selectedCategories, value) {
    let match = _.includes(selectedCategories, value);

    if (match) {
      return match;
    }
    return false;
  }

  render() {
    return (
      <OptionSelectionGroup name='selectedBrands'
                            id='brands'
                            type='checkbox'
                            className={gridClasses}
                            onChange={this.props.onBrandsChange}>
        {
          Object.keys(this.props.brands).map((a) => {
            let value = this.props.brands[a].name;

            return (
              <OptionSelection value={value}
                               key={value}
                               className={this.matchesBrand(this.props.selectedBrands, value) ?
                                   'checked' : null}
                                checked={this.matchesBrand(this.props.selectedBrands, value) ?
                                   'true' : ''}>
                <img alt={value} src={'/images/capsuling/brands/' + this.props.brands[a].image}/>
              </OptionSelection>
            );
          })
        }
      </OptionSelectionGroup>
    );
  }
}

export default CapsulingBrandsGroup;
