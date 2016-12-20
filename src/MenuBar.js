import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// TODO: get styles out, generalize and make customizable
const menuBarStyle = {
  height: '25px',
  userSelect: 'none'
}

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._dropDown = this._dropDown.bind(this);
    this._clickOnMenuItem = this._clickOnMenuItem.bind(this);
    this._closeMenu = this._closeMenu.bind(this);

    this.state = {
      droppedDownIndex: -1,
      clicked: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutside);
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

  _handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode.contains(e.target)) {
      this._closeMenu();
    }
  }

  render() {
    return (
      <div style={menuBarStyle}>
        {
          React.Children.map(this.props.children, (Component,index) => {
            return React.cloneElement(
              Component,
              {
                droppedDown: this.state.clicked && index === this.state.droppedDownIndex,
                dropDown: this._dropDown(index),
                handleClick: this._clickOnMenuItem,
                closeMenu: this._closeMenu,
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

export default MenuBar;

