import React from 'react';

import SecuredPage from 'mx_common/client/components/SecuredPage';
import PageTitle from 'mx_common/client/components/PageTitle';
import PDPOverlay from 'mx_common/client/components/PDPOverlay';

import CapsulingResultsClothingCategory from './CapsulingResultsClothingCategory';

class CapsulingResults extends SecuredPage {
  static get propTypes() {
    return {
      user: React.PropTypes.object,
      wardrobe: React.PropTypes.object,
      getWardrobe: React.PropTypes.func,
      loadCapsulingProfile: React.PropTypes.func,
      showPDPOverlay: React.PropTypes.func,
      pdpOverlayShowing: React.PropTypes.bool,
      pdpOverlayProductId: React.PropTypes.number,
      pdpOverlayColor: React.PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.editPreferences = this.editPreferences.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.user && nextProps.user.uid && !nextProps.wardrobe) {
      this.props.getWardrobe();
    }
  }

  componentWillMount() {
    if (this.props.getWardrobe) {
      this.props.getWardrobe();
    }
    if (this.props.loadCapsulingProfile) {
      this.props.loadCapsulingProfile();
    }
  }

  editPreferences() {
    this.props.loadCapsulingProfile();
    this.goToLocation('/workwardrobe/profile');
  }

  goToLocation(location) {
    window.location = location;
  }

  renderSecured() {
    var wardrobeItems, clothingCategory;

    if (this.props.wardrobe && this.props.wardrobe.wardrobeItems) {
      wardrobeItems = this.props.wardrobe.wardrobeItems;

      return (
        <div id='capsuling-results' className='capsuling-profile'>
          <PageTitle lineOne='my' lineTwo='wardrobe'/>

          <h2 className='top'>Work outfit results</h2>

          <h3>Pick the items you want in your wardrobe.</h3>
          <a onClick={this.editPreferences} className='outline-button'>edit preferences</a>
          {
            Object.keys(wardrobeItems).map((a) => {
              clothingCategory = wardrobeItems[a];
              return (
                <CapsulingResultsClothingCategory className={'clothing-category-' + a}
                                                  key={clothingCategory.clothingCategoryId + a}
                                                  clothingCategory={clothingCategory}
                  {...this.props}/>
              );
            })
          }
          <PDPOverlay ref='pdpOverlay'
                      overlayId='pdpOverlay'
                      container={window.document.body}
                      headerHeight={60}
                      pdpOverlayShowing={this.props.pdpOverlayShowing}
                      pdpOverlayProductId={this.props.pdpOverlayProductId}
                      pdpOverlayColor={this.props.pdpOverlayColor}
            {...this.props}
            />
        </div>
      );
    }
    return (<div></div>);
  }

  render() {
    return (
      <div id='capsuling-results' className='capsuling-profile'>
        <PageTitle lineOne='my' lineTwo='wardrobe'/>
        {super.render()}
      </div>
    );
  }
}

export default CapsulingResults;
