import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledMenuBar = styled.div`
  height: 25px;
  user-select: none;
`;

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
      <StyledMenuBar>
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
      </StyledMenuBar>
    );
  }

  static propTypes = {

  }
}

export default MenuBar;

