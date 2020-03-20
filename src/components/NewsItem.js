import React from 'react';

export const NewsItem = (props) => {
  // Presentational
  return (
    <div className='card'>
      <div className='rank'>{props.rank}</div>
      <div className='article'>
        <div className='card-title'><a href={props.url} target='_blank' rel='noopener noreferrer' className='newslink'>{props.title}</a><span className='domain'> {props.domain}</span></div>
        <div className='subtitle'><span className='score'>{props.score} points</span><span className='user'> by {props.by}</span><span className='time'> {props.time} ago</span></div>
      </div>
    </div>
  );
}
