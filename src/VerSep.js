import React, { PropTypes } from 'react';

const horSepStyle = {
  borderLeft: '1px solid rgba(0,0,0,0.2)',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  margin: '0 10px'
}

class VerSep extends React.Component {
  render () {
    return (<div style={horSepStyle}></div>);
  }
}

export default VerSep;
