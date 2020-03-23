import React from "react";
import { ThemeSwitchContainer } from "./ThemeSwitchContainer";

export const Header = (props) => {
  return (
    <header>
      <div id='header-title'>React Hacker News</div>
      <ThemeSwitchContainer />
    </header>
  );
}
