import React from 'react';
import { NewsList } from './NewsList';
import { PageNav } from './PageNav';

export class PageHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 1 };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleNext() {
    this.setState((state, props) => ({
      pageNumber: state.pageNumber + 1
    }));
  }

  handlePrev() {
    this.setState((state, props) => ({
      pageNumber: state.pageNumber - 1
    }));
  }

  render() {
    return (
      <div id="newsContainer">
        <NewsList
          stories={this.props.stories}
          pageNumber={this.state.pageNumber}
        />
        <PageNav
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          page={this.state.pageNumber}
        />
      </div>
    );
  }
}
