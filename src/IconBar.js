import React, { PropTypes } from 'react';

// TODO: get styles out, generalize and make customizable
const iconBarStyle = {
  height: '35px',
  userSelect: 'none',
  marginTop: '5px',
  paddingLeft: '15px',
  borderTop: '1px solid rgba(0,0,0,0.2)',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
  height: '40px',
  boxShadow: '0 2px 2px rgba(0,0,0,0.2)'
}

class IconBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div style={iconBarStyle}>
        {this.props.children}
      </div>
    );
  }

  static propTypes = {

  }
}

export default IconBar;
