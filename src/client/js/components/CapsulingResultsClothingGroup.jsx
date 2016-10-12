import React from 'react';
import _ from 'lodash';
import ProductThumbnailCarousel from 'mx_common/client/components/ProductThumbnailCarousel';
import CapsulingResultsColorsSwatches from './CapsulingResultsColorSwatches';

class CapsulingResultsClothingGroup extends React.Component {
  static get propTypes() {
    return {
      clothingGroup: React.PropTypes.object,
      suggestedItems: React.PropTypes.object,
      getSuggestedItems: React.PropTypes.func,
      capsulingProfile: React.PropTypes.object,
      showPDPOverlay: React.PropTypes.func
    };
  }

  getMColors() {
    return (this.props.clothingGroup.mColors) ? this.props.clothingGroup.mColors.join(',') : '';
  }

  componentWillMount() {
    if (this.props.getSuggestedItems) {
      this.props.getSuggestedItems(
        this.props.clothingGroup.name,
        this.getMColors(),
        this.props.capsulingProfile.clothingSize,
        this.props.capsulingProfile.shoeSize
      );
    }
  }

  render() {
    var mColors = this.getMColors(),
      products,
      emptyMessage = 'We\'re so sorry! This item is currently not available. ' +
        '<a href="/workwardrobe/profile">Edit Your Preferences</a>',
      requestComplete = false;

    if (!_.isEmpty(this.props.suggestedItems) &&
      this.props.suggestedItems[this.props.clothingGroup.name + ':' + mColors]) {
      products = this.props.suggestedItems[this.props.clothingGroup.name + ':' + mColors].items;
      requestComplete = true;
    } else {
      products = [];
    }

    return (
      <div className='clothing-group row'>
        <div className='columns small-3 clothing-group-info'>
          <div className='clothing-group-icon'><img src={'/images/capsuling/clothingGroups/' +
            this.props.clothingGroup.clothingGroupImg}/></div>
          <div className='name'>{this.props.clothingGroup.name}</div>
          <div className='defaultColorPalette'>Color: {this.props.clothingGroup.defaultColorPalette}</div>
          <CapsulingResultsColorsSwatches colors={this.props.clothingGroup.hexColors}/>
        </div>
        <div className='columns small-9 capsuling-products'>
          <ProductThumbnailCarousel products={products} emptyMessage={emptyMessage} requestComplete={requestComplete}
                                    showPDPOverlay={this.props.showPDPOverlay} />
        </div>
      </div>
    );
  }
}

export default CapsulingResultsClothingGroup;
