import React from 'react';

export const Button = (props) => {
  if (props.shouldDisplay) {
    return (
      <button className="navButton"
              onClick={props.onClick}
              id={props.id}>
              {props.value}
     </button>
    );
  } else {
    return null;
  }
}
