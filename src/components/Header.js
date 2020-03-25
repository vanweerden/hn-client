import React from "react";
import { ThemeSwitchContainer } from "./ThemeSwitchContainer";

export const Header = (props) => {
  return (
    <header>
      <div id='info-container'>
        <div id='header-title'>Slacker Hacker News</div>
        <div id='header-info'>A minimalist Hacker News interface</div>
      </div>
      <ThemeSwitchContainer />
    </header>
  );
}
