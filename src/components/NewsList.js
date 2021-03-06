import React from 'react';
import { NewsItemContainer } from './NewsItemContainer';

export const NewsList = (props) => {
  // Lists news items depending on page number
  const stories = props.stories;
  const pageLimit = 30;
  let page = props.pageNumber;
  let lastEntry = page * pageLimit;
  let firstEntry = lastEntry - (pageLimit - 1);

  const listItems = stories
    .slice((firstEntry - 1), lastEntry)
    .map((item, i) => {
      const rank = pageLimit * (page - 1) + (i + 1);
      return (
        <NewsItemContainer item={item}
                           rank={rank}
                           key={item.id} />
      );
  });
  return (
    <ul id='entries'>
      <li id='data-title'>
        <span id='comments-title'>comments</span>
        <span id='score-title'>points</span>
      </li>
      {listItems}
    </ul>
  )
}
