import React from "react";

export const ThemeSwitch = props => {
  return (
    <label class="switch">
      <input type="checkbox"
             onClick={props.clickHandler} />
      <span class="slider"></span>
    </label>
  );
}
