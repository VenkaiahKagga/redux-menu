import React, { PropTypes } from 'react';
import styled from 'styled-components';

// TODO: get styles out, generalize and make customizable
const StyledIconBar = styled.div`
  height: 35px;
  user-select: none;
  margin-top: 5px;
  height: 40px;
`

class IconBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <StyledIconBar>
        {this.props.children}
      </StyledIconBar>
    );
  }

  static propTypes = {

  }
}

export default IconBar;
