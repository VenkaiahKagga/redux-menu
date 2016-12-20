import React, { PropTypes } from 'react';

// TODO: get styles out, generalize and make customizable
const verSepStyle = {
  borderLeft: '1px solid rgba(0,0,0,0.2)',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  margin: '0 10px'
}

class VerSep extends React.Component {
  render () {
    return (<div style={verSepStyle}></div>);
  }
}

export default VerSep;
