import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Tooltipify from './Tooltipify';

// TODO: get styles out, generalize and make customizable
const iconStyle = {
  margin: '5px',
  fontSize: '14pt',
  color: '#555555',
  padding: '5px'
}

class IconItem extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      clicking: false
    };
  }


  _handleMouseDown(e) {
    this.setState({
      clicking: true,
    });
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(e);
    }
  }

  _handleMouseUp(_e) {
    this.setState({
      clicking: false,
    });
  }

  _handleMouseLeave(_e) {
    this.setState({
      clicking: false
    });
  }

  _adaptHover(style) {
    if (!this.state.clicking || this.props.disabled) {
      return style;
    } else {
      return {
        ...style,
        boxShadow: 'inset 0 0 3px black'
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
    const TooltipifiedIcon = Tooltipify(props => <i {...props} />);
    let tooltip;
    if (!this.props.disabled)
      tooltip = `${this.props.name} ${this.props.shortKey ? `(${this.props.shortKey})` : ''}`;
    return (
      <TooltipifiedIcon
        tooltip={tooltip}
        class={`fa fa-${this.props.icon} ${!this.props.disabled && 'hover-icon'}`}
        style={this._adaptDisabled(this._adaptHover(iconStyle))}
        onMouseDown={this._handleMouseDown.bind(this)}
        onMouseUp={this._handleMouseUp.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)}
      />
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
  }
)(IconItem);
