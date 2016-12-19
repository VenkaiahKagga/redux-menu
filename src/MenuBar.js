import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside'

const menuBarStyle = {
  height: '25px',
  userSelect: 'none',
  marginTop: '5px',
  marginLeft: '10px'
}

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDownIndex: -1,
      clicked: false
    }
  }

  _dropDown(index) {
    return () => {
      this.setState({
        droppedDownIndex: index,
      });
    }
  }

  _clickOnMenuItem() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  _closeMenu() {
    this.setState({
      clicked: false
    });
  }

  handleClickOutside(_e) {
    this._closeMenu();
  }

  render() {
    return (
      <div style={menuBarStyle}>
        {
          this.props.children.map((Component,index) => {
            return React.cloneElement(
              Component,
              {
                droppedDown: this.state.clicked && index === this.state.droppedDownIndex,
                dropDown: this._dropDown(index).bind(this),
                handleClick: this._clickOnMenuItem.bind(this),
                closeMenu: this._closeMenu.bind(this),
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

export default onClickOutside(MenuBar);

