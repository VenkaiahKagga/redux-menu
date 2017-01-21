import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Tooltipify from './Tooltipify';

const StyledIconItem = styled.i`
  margin: 5px;
  font-size: 14pt;
  padding: 5px;
  color: ${props => props.disabled ? '#BBBBBB' : '#555555'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  box-shadow: ${props => props.clicking ? 'inset 0 0 2px black' : 'none'};
  &:hover {
    box-shadow: ${props => props.disabled ? 'none' :
                           props.clicking ? 'inset 0 0 2px black' :
                                            '0 0 3px black'};
  }
`

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

  render() {
    const { name, disabled, icon, shortKey } = this.props;
    const { clicking } = this.state;
    const TooltipifiedIcon = Tooltipify(props => <StyledIconItem {...props} />);
    let tooltip;
    if (!disabled)
      tooltip = `${name} ${shortKey ? `(${shortKey})` : ''}`;
    return (
      <TooltipifiedIcon
        tooltip={ tooltip }
        className={ icon }
        onMouseDown={ this._handleMouseDown.bind(this) }
        onMouseUp={ this._handleMouseUp.bind(this) }
        onMouseLeave={ this._handleMouseLeave.bind(this) }
        disabled={ disabled }
        clicking={ clicking }
      />
    );
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    shortKey: PropTypes.string,
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
