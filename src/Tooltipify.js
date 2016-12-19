import React, { PropTypes } from 'react'

import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

function Tooltipify(WrappedComponent) {
  return ({tooltip, ...props}) => {
    if (!tooltip) {
      return <WrappedComponent {...props} />;
    } else {
      const tooltipComp = (
        <Tooltip id='tooltip' children={tooltip} />
      );
      return (
        <OverlayTrigger placement='bottom' overlay={tooltipComp}>
          <WrappedComponent {...props} />
        </OverlayTrigger>
      );
    }
  }
}

export default Tooltipify;
