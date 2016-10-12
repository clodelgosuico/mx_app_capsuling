import React from 'react';
import _ from 'lodash';

import SecuredPage from 'mx_common/client/components/SecuredPage';
import PageTitle from 'mx_common/client/components/PageTitle';

import CapsulingColors from './CapsulingColors';
import CapsulingSizing from './CapsulingSizing';
import CapsulingBrands from './CapsulingBrands';
import CapsulingBudget from './CapsulingBudget';
import CapsulingSelection from './CapsulingSelection';

import Carousel from 'nuka-carousel';

import { browserHistory } from 'react-router';

class CapsulingProfile extends SecuredPage {
  static get propTypes() {
    return {
      user: React.PropTypes.object,
      capsulingProfile: React.PropTypes.object,
      loadCapsulingProfile: React.PropTypes.func,
      userLoadStatus: React.PropTypes.string
    };
  }

  constructor(props) {
    super(props);

    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);

    this.state.slideIndex = 0;
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.user && nextProps.user.uid && _.isEmpty(nextProps.capsulingProfile)) {
      this.props.loadCapsulingProfile();
    }
  }

  componentWillMount() {
    if (this.props.userLoadStatus === 'Ensured') {
      this.props.loadCapsulingProfile();
    }
  }

  goToNext() {
    window.scrollTo(0, 0);
    this.state.slideIndex++;
    this.refs.carousel.nextSlide();
  }

  goToPrev() {
    window.scrollTo(0, 0);
    this.state.slideIndex--;
    this.refs.carousel.previousSlide();
  }

  goToSelection() {
    browserHistory.push('/capsuling/selection');
  }

  renderPageTitle() {
    return (
      <PageTitle lineOne='my' lineTwo='wardrobe'/>
    );
  }

  renderSecured() {
    this.brands = [
      {
        name: 'Alfani',
        image: 'logo_alfani.png'
      },
      {
        name: 'American Rag',
        image: 'logo_ar.png'
      },
      {
        name: 'Bar III',
        image: 'logo_bar.png'
      },
      {
        name: 'Calvin Klein',
        image: 'logo_ck.png'
      },
      {
        name: 'INC',
        image: 'logo_inc.png'
      },
      {
        name: 'Levi\'s',
        image: 'logo_levis.png'
      },
      {
        name: 'Michael Kors',
        image: 'logo_mk.png'
      },
      {
        name: 'The North Face',
        image: 'logo_nf.png'
      },
      {
        name: 'Nike',
        image: 'logo_nike.png'
      },
      {
        name: 'Ralph Lauren',
        image: 'logo_RL.png'
      },
      {
        name: 'Syle & co.',
        image: 'logo_sandc.png'
      },
      {
        name: 'Vivienne Westwood',
        image: 'logo_vw.png'
      }
    ];
    this.clothingGroups = [
      {
        category: 'tops',
        items: [
          {
            name: 'Blouses',
            id: 'cgp:f:blouse',
            image: 'top_blouse.jpg'
          },
          {
            name: 'Button Front',
            id: 'cgp:f:button_front',
            image: 'top_buttonfront.jpg'
          },
          {
            name: 'Polo Shirts',
            id: 'cgp:f:polo_shirt',
            image: 'top_polo.jpg'
          },
          {
            name: 'T-shirts',
            id: 'cgp:f:cotton_tshirt',
            image: 'top_tshirt.jpg'
          },
          {
            name: 'Basics',
            id: 'cgp:f:top',
            image: 'top_basic.jpg'
          },
          {
            name: 'Tunics',
            id: 'cgp:f:tunic',
            image: 'top_tunic.jpg'
          },
          {
            name: 'Sweaters',
            id: 'cgp:f:sweater',
            image: 'top_sweater.jpg'
          },
          {
            name: 'Sweatshirts',
            id: 'cgp:f:sweatshirt',
            image: 'top_sweatshirt.jpg'
          },
          {
            name: 'Blazers',
            id: 'cgp:f:blazer',
            image: 'outerwear_blazers.jpg'
          }
        ]
      },
      {
        category: 'bottoms',
        items: [
          {
            name: 'Trousers',
            id: 'cgp:f:dress_trousers',
            image: 'bottom_trousers.jpg'
          },
          {
            name: 'Jeans',
            id: 'cgp:f:jeans',
            image: 'bottom_jeans.jpg'
          },
          {
            name: 'Soft Pants & Joggers',
            id: 'cgp:f:softpants',
            image: 'bottom_soft_pants.jpg'
          },
          {
            name: 'Knee Lengths',
            id: 'cgp:f:knee_length',
            image: 'bottom_kneelength.jpg'
          },
          {
            name: 'Maxis',
            id: 'cgp:f:maxi',
            image: 'bottom_maxis.jpg'
          },
          {
            name: 'Minis',
            id: 'cgp:f:mini',
            image: 'bottom_minis.jpg'
          },
          {
            name: 'Shorts',
            id: 'cgp:f:shorts',
            image: 'bottom_shorts.jpg'
          },
          {
            name: 'Yoga Pants',
            id: 'cgp:f:yoga_pants',
            image: 'bottom_yogapants.jpg'
          }
        ]
      },
      {
        category: 'dresses',
        items: [
          {
            name: 'Work Dresses',
            id: 'cgp:f:business_dress',
            image: 'dress_work.jpg'
          },
          {
            name: 'Daytime Dresses',
            ids: ['cgp:f:day_dress', 'cgp:f:tshirt_dress'],
            image: 'dress_daytime.jpg'
          },
          {
            name: 'Formal Dresses',
            id: 'cgp:f:formal_dress',
            image: 'dress_formal.jpg'
          },
          {
            name: 'Jumpsuits & Rompers',
            ids: ['cgp:f:jumpsuits', 'cgp:f:rompers'],
            image: 'dress_jumpsuit.jpg'
          },
          {
            name: 'Party/Cocktail Dresses',
            id: 'cgp:f:party_dress',
            image: 'dress_party.jpg'
          }
        ]
      },
      {
        category: 'shoes',
        items: [
          {
            name: 'Booties',
            id: 'cgp:f:booties',
            image: 'shoe_booties.jpg'
          },
          {
            name: 'Boots',
            id: 'cgp:f:boots',
            image: 'shoe_boots.jpg'
          },
          {
            name: 'Flats',
            id: 'cgp:f:flats',
            image: 'shoe_flats.jpg'
          },
          {
            name: 'Pumps',
            id: 'cgp:f:heels',
            image: 'shoe_pumps.jpg'
          },
          {
            name: 'Loafers',
            id: 'cgp:f:loafers',
            image: 'shoe_loafer.jpg'
          },
          {
            name: 'Oxfords',
            id: 'cgp:f:oxfords',
            image: 'shoe_oxfords.jpg'
          },
          {
            name: 'Sandals',
            id: 'cgp:f:sandals',
            image: 'shoe_sandals.jpg'
          },
          {
            name: 'Athletic Shoes',
            id: 'cgp:f:sneakers',
            image: 'shoe_athletic.jpg'
          },
          {
            name: 'Wedges',
            id: 'cgp:f:wedges',
            image: 'shoe_wedges.jpg'
          }
        ]
      },
      {
        category: 'outerwear',
        items: [
          {
            name: 'Jackets',
            id: 'cgp:f:jackets',
            image: 'outerwear_jackets.jpg'
          },
          {
            name: 'Coats',
            id: 'cgp:f:coat',
            image: 'outerwear_coat.jpg'
          },
          {
            name: 'Overcoats',
            id: 'cgp:f:overcoat',
            image: 'outerwear_overcoat.jpg'
          }
        ]
      }
    ];

    return (
        <div className='carousel-wrapper'>
          <Carousel ref='carousel' dragging={false} decorators={null} slideIndex={this.state.slideIndex}>
            <CapsulingColors {...this.props}
              goToNext={this.goToNext}/>
            <CapsulingSizing {...this.props}
              goToNext={this.goToNext}
              goToPrev={this.goToPrev}/>
            <CapsulingBrands {...this.props}
              goToNext={this.goToNext}
              goToPrev={this.goToPrev}
              brands={this.brands}/>
            <CapsulingBudget {...this.props}
              goToNext={this.goToNext}
              goToPrev={this.goToPrev}/>
            <CapsulingSelection {...this.props}
              goToNext={this.goToSelection}
              goToPrev={this.goToPrev}
              clothingGroups={this.clothingGroups}/>
          </Carousel>
        </div>
      );
  }

  render() {
    return (
      <div id='capsuling-profile' className='capsuling-profile'>
        <PageTitle lineOne='my' lineTwo='wardrobe'/>
        {super.render()}
      </div>
    );
  }
}

export default CapsulingProfile;
