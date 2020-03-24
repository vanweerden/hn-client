import React from 'react';

export const NewsItem = (props) => {
  return (
    <li className='entry'>
      <a href={props.itemUrl} className='story-info'>
        <span className='comments'>{props.comments}</span>
        <span className='score'>{props.score}</span>
      </a>
      <a className='story' href={props.url}>
        <span className='title'>{props.title}</span>
        <span className='domain'> {props.domain}</span>
      </a>
    </li>
  );
}
