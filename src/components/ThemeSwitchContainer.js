import React from 'react';
import { ThemeSwitch } from './ThemeSwitch';

export class ThemeSwitchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState(prevState => ({
      check: !prevState.check
    }));
  }

  componentDidUpdate() {
    if (this.state.check) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'default');
    }
  }

  render() {
    return <ThemeSwitch clickHandler={this.toggleTheme} />;
  }
}
