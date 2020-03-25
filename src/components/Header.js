import React from "react";
import { ThemeSwitchContainer } from "./ThemeSwitchContainer";

export const Header = (props) => {
  return (
    <header>
      <div id='header-title'>Simple Hacker News</div>
      <ThemeSwitchContainer />
    </header>
  );
}
