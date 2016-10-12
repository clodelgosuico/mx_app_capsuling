import '../../css/main.scss';
import React from 'react';

const emptyColorGroupList = [
  {hex: '#fff', selected: false},
  {hex: '#fff', selected: false},
  {hex: '#fff', selected: false}
];

class CapsulingColorSelectedGroup extends React.Component {
  static get propTypes() {
    return {
      selectedColorList: React.PropTypes.array,
      isActive: React.PropTypes.bool,
      onColorTypeChange: React.PropTypes.func,
      title: React.PropTypes.string
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    var mergedSelectedColorGroup = emptyColorGroupList.map((colorObject, index)=> {

      var val = this.props.selectedColorList[index];

      return (val) ? val : colorObject;
    });

    return (
      <div className={this.props.isActive ? 'color-selected-group active' : 'color-selected-group'}>
        <span onClick={this.props.onColorTypeChange}
              className={'section-title' + (this.props.selectedColorList.length === 3 ? ' checked' : '')}>
          <span>{this.props.title}</span>
        </span>

        <div className='colors-selections'>
          {mergedSelectedColorGroup.map((object, index)=> {
            return (<div key={index} style={{'backgroundColor': object.hex}}
                         className={object.selected ? 'selected' : ''}></div>);
          })}
        </div>
      </div>
    );
  }
}

export default CapsulingColorSelectedGroup;
