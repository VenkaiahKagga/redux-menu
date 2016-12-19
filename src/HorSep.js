import React, { PropTypes } from 'react';

const horSepStyle = {
  width: '100%',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
  margin: '5px 0'
}

class HorSep extends React.Component {
  render () {
    return (<div style={horSepStyle}></div>);
  }
}

export default HorSep;
