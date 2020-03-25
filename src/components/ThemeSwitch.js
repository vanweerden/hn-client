import React from 'react';
import { HaxMode } from './HaxMode';

export const ThemeSwitch = props => {
  return (
    <div id='hax-container'>
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox"
                 onClick={props.clickHandler} />
          <span className="slider"></span>
        </label>
      </div>
      <HaxMode display={props.isDarkMode} />
    </div>
  );
}
