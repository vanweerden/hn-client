import React from 'react';

export const NewsItem = (props) => {
  // Presentational
  return (
    <div className='card'>
      <div className='rank'>{props.rank}</div>
      <div className='article'>
        <div><a href={props.url} target='_blank' rel='noopener noreferrer' className='card-link'><span className='card-title'>{props.title}</span><span className='domain'> {props.domain}</span></a></div>
        <div className='subtitle'><a href={props.itemUrl}>
          <span className='comments'>{props.comments} comments</span> | <span className='score'>{props.score} points</span> | <span className='time'> {props.time} ago</span></a>
        </div>
      </div>
    </div>
  );
}
