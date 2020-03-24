import React from "react";

export const ThemeSwitch = props => {
  return (
    <label className="switch">
      <input type="checkbox"
             onClick={props.clickHandler} />
      <span className="slider"></span>
    </label>
  );
}
