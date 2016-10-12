import React from 'react';
import CapsulingResultsClothingGroup from './CapsulingResultsClothingGroup';

class CapsulingResultsClothingCategory extends React.Component {
  static get propTypes() {
    return {
      clothingCategory: React.PropTypes.object,
      className: React.PropTypes.string
    };
  }

  render() {
    return (
      <section className={'clothing-category ' + this.props.className}>
        <h2 className='category-name'>{this.props.clothingCategory.clothingCategoryName}</h2>
        {
          Object.keys(this.props.clothingCategory.clothingGroups).map((a) => {
            return (
              <CapsulingResultsClothingGroup key={this.props.clothingCategory.clothingGroups[a].id}
                                             clothingGroup={this.props.clothingCategory.clothingGroups[a]}
                {...this.props}/>
            );
          })
        }
      </section>
    );
  }
}

export default CapsulingResultsClothingCategory;
