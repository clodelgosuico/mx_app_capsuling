import React from 'react';
import Scroll from 'react-scroll';
import {Link} from 'react-router';
import {isNonMobile} from 'mx_common/client/utils/mediaQuery';

var LinkScroll = Scroll.Link;
var Element = Scroll.Element;

class CapsulingInfo extends React.Component {
  static get propTypes() {
    return {};
  }

  componentDidMount() {
    this.makeItFullPage();
    window.addEventListener('resize', this.makeItFullPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.makeItFullPage.bind(this));
  }

  makeItFullPage() {
    if (isNonMobile()) {
      this.refs.section1.style.height = (window.innerHeight - 60) + 'px';
    } else {
      this.refs.section1.style = '';
    }
  }

  render() {
    return (
      <div id='capsule-info-page'>
        <div id='section-1' ref='section1' className='section'>
          <div className='full'>
            <div className='mobile-image-container'>
              <img src='/images/capsuling/Capuling_MVP_d_hero_Image.jpg'/>
            </div>
            <div className='text-container'>
              <h3>Work it</h3>
              <h5>Get perfect pieces to build<br/><span className='nowrap'>your ultimate work wardrobe.</span></h5>
              <LinkScroll to='section-2' className='button' smooth offset={80} duration={500}>find out more</LinkScroll>
            </div>
          </div>
        </div>
        <Element name='section-2' id='section-2' className='section'>
          <h3>How It Works</h3>

          <div className='steps'>
            <ul id='step-1' className='small-block-grid-2'>
              <li className='text-container'>
                <span className='number'>1</span>

                <div>
                  <h5>Tell us about your style</h5>

                  <p>Complete a quick survey &amp; we'll build your custom closet.</p>
                </div>
              </li>
              <li className='image-container'>
                <img src='/images/capsuling/Capsule_MVP_d_infoPage1.png'/>
              </li>
            </ul>
            <ul id='step-2' className='small-block-grid-2'>
              <li className='image-container'>
                <img src='/images/capsuling/Capsule_MVP_d_infoPage2.png'/>

              </li>
              <li className='text-container'>
                <span className='number'>2</span>

                <div>
                  <h5>Choose your items</h5>

                  <p>Select the items you want to create a wardrobe that works.</p>
                </div>
              </li>
            </ul>
            <ul id='step-3' className='small-block-grid-2'>
              <li className='text-container'>
                <span className='number'>3</span>

                <div>
                  <h5>Enjoy</h5>

                  <p>Start building your new wardrobe!</p>
                </div>
              </li>
              <li className='image-container'>
                <img src='/images/capsuling/Capsule_MVP_d_infoPage3.png'/>
              </li>
            </ul>
          </div>
          <div id='subscription-open'>
            <Link to='/workwardrobe/profile' className='button'>let's go</Link>
          </div>
        </Element>
      </div>
    );
  }
}

export default CapsulingInfo;
