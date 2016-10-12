import '../../css/main.scss';
import React from 'react';

class CapsulingColorGroup extends React.Component {
  static get propTypes() {
    return {
      colorGroupName: React.PropTypes.string,
      colorList: React.PropTypes.array,
      isActive: React.PropTypes.bool,
      children: React.PropTypes.array,
      onColorSelect: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.onColorSelect = this.onColorSelect.bind(this);
  }

  onColorSelect(color) {
    this.props.onColorSelect(color, this.props.colorGroupName);
  }

  render() {
    return (
      <div id={'colors-' + this.props.colorGroupName + '-group'}
           className={this.props.isActive ? 'color-group active' : 'color-group'}>
        {this.props.children[0]}
        {this.props.children[1]}
        <div className='colors-selection-group'>
          {this.props.colorList.map((object, index)=> {
            return (<div key={index} className={'color-container' + (object.selected ? ' selected' : '')}>
              <div style={{'backgroundColor': object.hex}} onClick={this.onColorSelect.bind(this, object.hex)}></div>
            </div>);
          })}
        </div>
        {this.props.children[2]}
      </div>
    );
  }
}

export default CapsulingColorGroup;
