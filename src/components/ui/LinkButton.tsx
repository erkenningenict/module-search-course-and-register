import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

export default function LinkButton(props) {
  const getSvgLine = () => {
    return (
      <svg className="link-button__line" width="50" height="5" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect fill="#fff" height="5" width="52" y="-1" x="-1" />
        </g>
      </svg>
    );
  };
  return (
    <Link className="link-button" to={props.to}>
      {props.children}
      {getSvgLine()}
    </Link>
  );
}
