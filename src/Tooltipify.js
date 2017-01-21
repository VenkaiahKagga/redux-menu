import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const StyledTooltip = styled.span`
  .tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    line-break: auto;
    line-height: 1.42857143;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    white-space: normal;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    font-size: 12px;
  }
  .tooltip.bottom {
    padding: 5px 0;
  }
  .tooltip-inner {
    max-width: 200px;
    padding: 3px 8px;
    color: #ffffff;
    text-align: center;
    background-color: #000000;
    border-radius: 4px;
  }
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .tooltip.bottom .tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: #000000;
  }

`

function Tooltipify(WrappedComponent) {
  return ({tooltip, ...props}) => {
    if (!tooltip) {
      return <WrappedComponent {...props} />;
    } else {
      const tooltipComp = (
       // <StyledTooltip>
          <Tooltip id='tooltip' children={tooltip} placement='bottom'/>
       // </StyledTooltip>
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
