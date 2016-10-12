import '../../css/main.scss';
import React from 'react';
import CapsulingColorGroup from './CapsulingColorGroup';
import CapsulingColorSelectedGroup from './CapsulingColorSelectedGroup';
import CapsulingProfileProgressBar from './CapsulingProfileProgressBar';
import CapsulingColorsMap from '../data/CapsulingColorsMap';
import _ from 'lodash';

class CapsulingColors extends React.Component {
  static get propTypes() {
    return {
      goToNext: React.PropTypes.func,
      saveCapsulingProfile: React.PropTypes.func
    };
  }

  constructor(props) {
    var colorPalette = {},
      clonedColorMap = _.cloneDeep(CapsulingColorsMap);

    function addSelected(colorPalette, name) {
      colorPalette[name] = _.map(clonedColorMap[name], (a) => {
        a.selected = false;
        return a;
      });
    }

    addSelected(colorPalette, 'neutral');
    addSelected(colorPalette, 'main');
    addSelected(colorPalette, 'accent');

    super(props);

    this.state = {
      activeColorType: 'neutral',
      selectionNextClassNames: 'next-button button disabled',
      colorPalette: colorPalette
    };

    this.handleGotoNextStep = this.handleGotoNextStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var colorPaletteState;

    if (nextProps.capsulingProfile && !_.isEmpty(nextProps.capsulingProfile.colorPalette)) {
      colorPaletteState = this.mergeStateAndNextProps(this.state.colorPalette,
        nextProps.capsulingProfile.colorPalette);
      this.setState({
        colorPalette: colorPaletteState,
        wardrobeId: nextProps.capsulingProfile.wardrobeId
      }, function () {
        this.updateNextButtonState(colorPaletteState);
      }.bind(this));
    }
  }

  mergeStateAndNextProps(state, nextProps) {
    function updateSelected(currentState, incoming) {
      if (incoming) {
        currentState.forEach(function (value) {
          if (_.includes(incoming, value.name)) {
            value.selected = true;
          }
        });
      }

      return currentState;
    }

    state.neutral = updateSelected(state.neutral, nextProps.neutral);
    state.main = updateSelected(state.main, nextProps.main);
    state.accent = updateSelected(state.accent, nextProps.accent);

    return state;
  }

  updateNextButtonState(colorPalette) {
    if (_.some(colorPalette.neutral, {selected: true}) && _.some(colorPalette.main, {selected: true}) &&
      _.some(colorPalette.accent, {selected: true})) {
      this.setState({selectionNextClassNames: 'next-button button'});
    } else {
      this.setState({selectionNextClassNames: 'next-button button disabled'});
    }
  }

  onColorTypeChange(colorType) {
    this.setState({
      activeColorType: colorType
    });
  }

  onColorSelect(color, colorListName) {
    var colorPalette = _.cloneDeep(this.state.colorPalette);
    var colorList = colorPalette[colorListName];
    var colorObject = _.find(colorList, (obj)=> {
      return obj.hex === color;
    });

    if (colorObject) {
      if (colorObject.selected) {
        colorObject.selected = false;
      } else {
        if (_.filter(colorList, _.matches({'selected': true})).length < 3) {
          colorObject.selected = true;
        }
      }
    }

    this.updateNextButtonState(colorPalette);
    this.setState({colorPalette});
  }

  prepareColorPalette(input) {
    return {
      'neutral': this.filterSelectedName(input.neutral),
      'main': this.filterSelectedName(input.main),
      'accent': this.filterSelectedName(input.accent)
    };
  }

  filterSelectedName(input) {
    var output = _.filter(input, function (o) {
      return o.selected;
    });

    output = _.map(output, 'name');
    return output;
  }

  handleGotoNextStep(e) {
    var body = {
      colorPalette: this.prepareColorPalette(this.state.colorPalette)
    };

    e.preventDefault();

    if (this.state.wardrobeId) {
      body.wardrobeId = this.state.wardrobeId;
    }
    if (this.state.selectionNextClassNames.indexOf('disabled') === -1) {
      this.props.saveCapsulingProfile(null, body, function () {
        this.props.goToNext();
      }.bind(this));
    }
  }

  render() {
    return (
      <div id='capsuling-colors' className='capsuling-profile'>

        <section id='headerMain'>
          <h2 className='top'>Shades to suit you</h2>

          <h3>Add neutral, main &amp; accent colors to create a prefect palette.</h3>

          <h3>Select up to 3 colors from each category. Changed your mind? Just deselect a shade to add another.</h3>
        </section>

        <section id='colors-group-tabs' className='colors-group-types'>
          <CapsulingColorSelectedGroup key='Neutrals'
                                       title='Neutrals'
                                       onColorTypeChange={this.onColorTypeChange.bind(this, 'neutral')}
                                       selectedColorList={_.filter(this.state.colorPalette.neutral, function (o) {
                                         return o.selected;
                                       })}
                                       isActive={this.state.activeColorType === 'neutral'}/>
          <CapsulingColorSelectedGroup key='Main'
                                       title='Main'
                                       onColorTypeChange={this.onColorTypeChange.bind(this, 'main')}
                                       selectedColorList={_.filter(this.state.colorPalette.main, function (o) {
                                         return o.selected;
                                       })}
                                       isActive={this.state.activeColorType === 'main'}/>
          <CapsulingColorSelectedGroup key='Accents'
                                       title='Accents'
                                       onColorTypeChange={this.onColorTypeChange.bind(this, 'accent')}
                                       selectedColorList={_.filter(this.state.colorPalette.accent, function (o) {
                                         return o.selected;
                                       })}
                                       isActive={this.state.activeColorType === 'accent'}/>
        </section>
        <div className='divider'></div>
        <CapsulingColorGroup
          colorGroupName='neutral'
          colorList={this.state.colorPalette.neutral}
          isActive={this.state.activeColorType === 'neutral'}
          onColorSelect={this.onColorSelect.bind(this)}>
          <h2>1 - Choose your neutral colors</h2>

          <h3>These are your foundation - you'll wear a neutral item most days.</h3>

          <h3 className='note'>Note: You don't have to pick 'blue' to get blue jeans - staples come in fundamental
            colors automatically.</h3>
        </CapsulingColorGroup>

        <CapsulingColorGroup
          colorGroupName='main'
          colorList={this.state.colorPalette.main}
          isActive={this.state.activeColorType === 'main'}
          onColorSelect={this.onColorSelect.bind(this)}>
          <h2>2 - Choose your main colors</h2>

          <h3>These are your favorites - you'll typically wear them a couple times a week.<br />Feel free to change
            these each season.</h3>
        </CapsulingColorGroup>

        <CapsulingColorGroup
          colorGroupName='accent'
          colorList={this.state.colorPalette.accent}
          isActive={this.state.activeColorType === 'accent'}
          onColorSelect={this.onColorSelect.bind(this)}>
          <h2>3 - Finally, choose your accent colors</h2>

          <h3>These add personality - you'll wear these occasionally as statement pieces.<br />Feel free to take a risk
            on a color that you've been wanting to try out.</h3>
        </CapsulingColorGroup>

        <ul className='button-group'>
          <li>
            <div className='next'><a className={this.state.selectionNextClassNames}
                                     onClick={this.handleGotoNextStep}>next</a>
            </div>
          </li>
          <li className='progress-bar-wrapper'><CapsulingProfileProgressBar currentStep={0}/></li>
        </ul>

      </div>
    );
  }
}

export default CapsulingColors;
