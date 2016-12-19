import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside'

import MenuDropdown from './MenuDropdown';

const dropdownItemStyle = {
  padding: '5px 10px',
  cursor: 'default',
}

const dropdownIconStyle = {
  marginLeft: '5px'
}

class DropdownItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDown: false
    };
  }

  _handleMouseEnter(_e) {
    this.setState({
      hovering: true
    });
  }

  _handleMouseLeave(_e) {
    this.setState({
      hovering: false,
    });
  }

  _handleClick(_e) {
    this.setState({
      droppedDown: !this.state.droppedDown
    })
  }

  handleClickOutside(_e) {
    debugger;
    this.setState({
      droppedDown: false
    });
  }

  _adaptHover(style) {
    if (!this.state.hovering && !this.state.droppedDown) {
      return style;
    } else {
      let nextStyle = {
        ...style,
        boxShadow: '0 0 3px black',
      }
      if (this.state.droppedDown) {
        nextStyle = {
          ...nextStyle,
          boxShadow: 'inset 0 0 3px black',
        }
      }
      return nextStyle;
    }
  }

  render () {
    return (
      <span>
        <span
          ref={c => this._anchorEl = c}
          style={this._adaptHover(dropdownItemStyle)}
          onClick={this._handleClick.bind(this)}
          onMouseEnter={this._handleMouseEnter.bind(this)}
          onMouseLeave={this._handleMouseLeave.bind(this)}
        >
          {this.props.name}
          <i class='fa fa-caret-down' style={dropdownIconStyle}></i>
        </span>
        { this.state.droppedDown &&
          <MenuDropdown
            anchorEl={this._anchorEl}
          >
            {this.props.children}
          </MenuDropdown>
        }
      </span>
    );
  }

  static propTypes = {

  }
}

export default onClickOutside(DropdownItem);
