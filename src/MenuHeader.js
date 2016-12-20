import React, { PropTypes } from 'react';

import MenuDropdown from './MenuDropdown';

// TODO: get styles out, generalize and make customizable
const menuHeaderStyle = {
  padding: '5px 10px',
  cursor: 'default',
}

// TODO: generalize this, merge partly with MenuItem
class MenuHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  _handleMouseEnter(_e) {
    this.setState({
      hovering: true
    });
    this.props.dropDown();
  }

  _handleMouseLeave(_e) {
    this.setState({
      hovering: false,
    });
  }

  _adaptHover(style) {
    if (!this.state.hovering && !this.props.droppedDown) {
      return style;
    } else {
      let nextStyle = {
        ...style,
        backgroundColor:'rgba(0,0,0,0.075)'
      }
      if (this.props.droppedDown) {
        nextStyle = {
          ...nextStyle,
          boxShadow: '0 0 2px black'
        }
      }
      return nextStyle;
    }
  }

  render() {
    return (
      <span>
        <span
          ref={c => this._anchorEl = c}
          style={this._adaptHover(menuHeaderStyle)}
          onClick={this.props.handleClick}
          onMouseEnter={this._handleMouseEnter.bind(this)}
          onMouseLeave={this._handleMouseLeave.bind(this)}
        >
          {this.props.name}
        </span>
        { this.props.droppedDown &&
          <MenuDropdown
            anchorEl={this._anchorEl}
            closeMenu={this.props.closeMenu}
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

export default MenuHeader;
