import React from 'react';

export const Button = (props) => {
  let disabled = props.disabled;
  return (
    <button className="navButton"
            onClick={props.onClick}
            id={props.id}
            disabled={disabled}>
            {props.value}
   </button>
  );
}
