import React from 'react';
import OptionSelectionGroup from 'mx_common/client/components/ui/OptionSelectionGroup';
import OptionSelection from 'mx_common/client/components/ui/OptionSelection';
import _ from 'lodash';

var gridClasses = 'small-block-grid-2 medium-block-grid-4 large-block-grid-5 xlarge-block-grid-6 xxlarge-block-grid-7';

class CapsulingSelectionClothingGroup extends React.Component {
  static get propTypes() {
    return {
      clothingGroup: React.PropTypes.array,
      categoryId: React.PropTypes.string,
      onCategoriesChange: React.PropTypes.func,
      selectedCategories: React.PropTypes.array
    };
  }

  matchesCategory(selectedCategories, ids) {
    let idArray = ids.split(',');

    for (let id in idArray) {
      let match = _.includes(selectedCategories, idArray[id]);

      if (match) {
        return match;
      }
    }
    return false;
  }

  render() {
    return (
      <OptionSelectionGroup name='selectedCategories'
                            id={this.props.categoryId}
                            key={this.props.categoryId}
                            type='checkbox'
                            className={gridClasses}
                            onChange={this.props.onCategoriesChange}>
        {
          Object.keys(this.props.clothingGroup).map((a) => {
            let ids = this.props.clothingGroup[a].ids,
              id = this.props.clothingGroup[a].id,
              value = (ids) ? ids.join(',') : id;

            return (
              <OptionSelection value={value}
                               key={value}
                               className={this.matchesCategory(this.props.selectedCategories, value) ?
                                   'checked' : null}
                                checked={this.matchesCategory(this.props.selectedCategories, value) ?
                                   'checked' : ''}>
                <img src={'/images/capsuling/clothingGroups/' + this.props.clothingGroup[a].image}/>
                <span>{this.props.clothingGroup[a].name}</span>
              </OptionSelection>
            );
          })
        }
      </OptionSelectionGroup>
    );
  }
}

export default CapsulingSelectionClothingGroup;
