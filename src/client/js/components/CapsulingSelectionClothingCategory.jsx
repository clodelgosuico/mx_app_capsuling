import React from 'react';
import CapsulingSelectionClothingGroup from './CapsulingSelectionClothingGroup';

class CapsulingSelectionClothingCategory extends React.Component {
  static get propTypes() {
    return {
      clothingCategoryName: React.PropTypes.string,
      clothingCategoryId: React.PropTypes.string,
      clothingGroup: React.PropTypes.array,
      selectedCategories: React.PropTypes.array,
      onCategoriesChange: React.PropTypes.func
    };
  }

  render() {
    return (
      <section>
        <h2 className='category-name'>{this.props.clothingCategoryName}</h2>
        <CapsulingSelectionClothingGroup
          categoryId={this.props.clothingCategoryId}
          clothingGroup={this.props.clothingGroup}
          selectedCategories={this.props.selectedCategories}
          onCategoriesChange={this.props.onCategoriesChange} />
      </section>
    );
  }
}

export default CapsulingSelectionClothingCategory;
