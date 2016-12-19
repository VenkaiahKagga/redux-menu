import React, { PropTypes } from 'react';

const BORDER_WIDTH = 1

const menuDropdownStyle = {
  position:'fixed',
  backgroundColor:'#FEFEFE',
  boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
  border: `${BORDER_WIDTH}px solid rgba(0,0,0,0.2)`,
  width:'300px',
  padding: '5px 0'
}

class MenuDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDownIndex: -1
    }
  }

  _dropDown(index) {
    return () => {
      this.setState({
        droppedDownIndex: index,
      });
    }
  }

  _adaptOffset(style) {
    let offsetLeft, offsetTop, parent;

    switch (this.props.bindAt) {
      case 'right':
        offsetLeft = this.props.anchorEl.offsetLeft + this.props.anchorEl.offsetWidth + (2 * BORDER_WIDTH);
        offsetTop = this.props.anchorEl.offsetTop;
        break;
      default:
        offsetLeft = this.props.anchorEl.offsetLeft - BORDER_WIDTH;
        offsetTop = this.props.anchorEl.offsetTop + this.props.anchorEl.offsetHeight + BORDER_WIDTH;
    }
    parent = this.props.anchorEl;
    while (parent = parent.offsetParent) {
      offsetLeft += parent.offsetLeft;
      offsetTop += parent.offsetTop;
    }
    return {
      ...style,
      top: offsetTop,
      left: offsetLeft
    }
  }

  render() {
    return (
      <div style={this._adaptOffset(menuDropdownStyle)}>
        {
          React.Children.map(this.props.children, (Component,index) => {
            return React.cloneElement(
              Component,
              {
                droppedDown: index === this.state.droppedDownIndex,
                dropDown: this._dropDown(index).bind(this),
                closeMenu: this.props.closeMenu,
                key: `menuItem-${index}`
              }
            )
          })
        }
      </div>
    );
  }

  static propTypes = {

  }
}

export default MenuDropdown;
