import '../../css/main.scss';

import React from 'react';
import CapsulingSelectionClothingCategory from './CapsulingSelectionClothingCategory';
import CapsulingProfileProgressBar from './CapsulingProfileProgressBar';
import _ from 'lodash';

class CapsulingSelection extends React.Component {
  static get propTypes() {
    return {
      saveCapsulingSelection: React.PropTypes.func,
      clothingGroups: React.PropTypes.array,
      user: React.PropTypes.object,
      capsulingProfile: React.PropTypes.object,
      goToNext: React.PropTypes.func,
      goToPrev: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: this.props.capsulingProfile ? this.props.capsulingProfile.selectedCategories : []
    };
    this.onCategoriesChange = this.onCategoriesChange.bind(this);

    this.handleGotoNextStep = this.handleGotoNextStep.bind(this);
  }

  hasSelectedCategories() {
    return !_.isEmpty(this.state.selectedCategories);
  }

  componentDidMount() {
    this.updateNextButtonState(this.hasSelectedCategories());
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.capsulingProfile)) {
      this.setState({
        selectedCategories: _.isEmpty(nextProps.capsulingProfile.selectedCategories) ?
          [] : nextProps.capsulingProfile.selectedCategories
      }, function () {
        this.updateNextButtonState(this.hasSelectedCategories());
      }.bind(this));
    }
  }

  updateNextButtonState(hasCategories) {
    if (hasCategories) {
      this.setState({selectionNextClassNames: 'next-button button'});
    } else {
      this.setState({selectionNextClassNames: 'next-button button disabled'});
    }
  }

  onCategoriesChange(e) {
    var selectedCategories = this.state.selectedCategories,
      values = e.target.value.split(',');

    if (e.target.checked) {
      for (let i in values) {
        if (!_.includes(selectedCategories, values[i])) {
          if (selectedCategories) {
            selectedCategories = selectedCategories.concat(values[i]);
          } else {
            selectedCategories = [values[i]];
          }
        }
      }
    } else {
      for (let i in values) {
        selectedCategories.splice(this.state.selectedCategories.indexOf(values[i]), 1);
      }
    }
    this.setState({
      'selectedCategories': selectedCategories
    });

    this.updateNextButtonState((selectedCategories.length > 0));
  }

  handleGotoNextStep(e) {
    var capsulingProfile;

    e.preventDefault();
    if (this.state.selectionNextClassNames.indexOf('disabled') === -1) {
      capsulingProfile = _.assign(this.props.capsulingProfile, this.state);

      this.props.saveCapsulingSelection(null, capsulingProfile, function () {
        this.props.goToNext();
      }.bind(this));
    }
  }

  render() {
    return (
      <div id='capsuling-selection' className='capsuling-profile'>

        <section>
          <h2 className='top'>Define your style</h2>

          <h3>Select the categories you would wear to work</h3>
        </section>

        <section>
          {
            Object.keys(this.props.clothingGroups).map((a) => {
              return (
                <CapsulingSelectionClothingCategory
                  key={this.props.clothingGroups[a].category}
                  clothingCategoryName={this.props.clothingGroups[a].category}
                  clothingGroup={this.props.clothingGroups[a].items}
                  clothingCategoryId={this.props.clothingGroups[a].category}
                  selectedCategories={this.state.selectedCategories}
                  onCategoriesChange={this.onCategoriesChange.bind(this)}
                  />
              );
            })
          }
        </section>

        <ul className='button-group'>
          <li>
            <div className='next'>
              <a className='prev-button button' onClick={this.props.goToPrev}>back</a>
              <a className={this.state.selectionNextClassNames} onClick={this.handleGotoNextStep}>next</a></div>
          </li>
          <li className='progress-bar-wrapper'><CapsulingProfileProgressBar currentStep={4}/></li>
        </ul>
      </div>
    );
  }
}

export default CapsulingSelection;
