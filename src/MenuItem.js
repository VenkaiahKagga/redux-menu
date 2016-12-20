import React, { PropTypes } from 'react';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';

import MenuDropdown from './MenuDropdown';

// TODO: get styles out, generalize and make customizable
const menuItemStyle = {
  boxSizing: 'border-box',
  width: '100%',
  cursor: 'pointer',
  paddingLeft: '5px',
  paddingTop: '5px',
  height: '30px'
}

const iconStyle = {
  width: '25px',
  display: 'inline-block'
}

const dropdownIconStyle = {
  float: 'right',
  marginRight: '5px'
}

const shortKeyStyle = {
  float: 'right',
  color: '#BBBBBB',
  marginRight: '5px',
  fontSize: '10pt'
}

const caretStyle = {
  width: 0,
  height: 0,
  borderTop: '5px solid transparent',
  borderBottom: '5px solid transparent',
  borderLeft: '5px solid gray',
  float: 'right',
  marginRight: '5px',
  marginTop: '5px',
  boxShadow: 'inset 0 0 5px black'
}

// TODO: generalize this, merge partly with MenuHeader
class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  _handleMouseEnter(_e) {
    this.setState({
      hovering: true,
    });
    this.props.dropDown();
  }

  _handleMouseLeave(_e) {
    this.setState({
      hovering: false,
    });
  }

  _adaptHover(style) {
    if (!this.state.hovering) {
      return style;
    } else {
      return {
        ...style,
        backgroundColor:'rgba(0,0,0,0.075)'
      };
    }
  }

  _adaptDisabled(style) {
    if (!this.props.disabled) {
      return style;
    } else {
      return {
        ...style,
        color: '#BBBBBB',
        cursor: 'default'
      }
    }
  }

  render() {
    return (
      <span>
        <div
          ref={c => this._anchorEl = c}
          style={this._adaptDisabled(this._adaptHover(menuItemStyle))}
          onMouseEnter={this._handleMouseEnter.bind(this)}
          onMouseLeave={this._handleMouseLeave.bind(this)}
          onClick={
            this.props.disabled ? x => x :
              this.props.onClick ? (e) => {
                this.props.onClick(this.props.dispatch, e);
                this.props.closeMenu();
              } : (_e) => {
                this.props.closeMenu();
              }
          }
        >
          <div style={iconStyle}>
            {this.props.icon &&
              <i className={this.props.icon}></i>
            }
          </div>
          {this.props.name}
          {!isEmpty(this.props.children) &&
            <i style={caretStyle}></i>
          }
          {this.props.shortKey && !this.props.disabled &&
            <div style={shortKeyStyle}>
              {this.props.shortKey}
            </div>
          }
        </div>
        {!isEmpty(this.props.children) && this.props.droppedDown &&
          <MenuDropdown
            anchorEl={this._anchorEl}
            bindAt='right'
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

export default connect(
  (state, ownProps) => {
    let extend = {};
    if (typeof ownProps.disabled === 'function')
      extend = {...extend, disabled: ownProps.disabled(state)};
    if (typeof ownProps.icon === 'function')
      extend = {...extend, icon: ownProps.icon(state)}
    if (typeof ownProps.name === 'function')
      extend = {...extend, name: ownProps.name(state)}
    return extend;
  },
  dispatch => ({ dispatch })
)(MenuItem);
