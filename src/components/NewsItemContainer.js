import React from 'react';
import { domainGrabber } from '../utils/domainGrabber';
import { NewsItem } from './NewsItem';

export const NewsItemContainer = (props) => {
  // Handles data for NewsItem, which displays it
  const item = props.item;

  // Hacker News articles do not have url in JSON object
  const itemUrl = 'https://news.ycombinator.com/item?id=' + item.id;
  const url = item.url ? item.url : itemUrl;
  const domain = item.url ? '(' + domainGrabber(url) + ')' : "";

  // Not rendered anymore
  const ms = (Date.now() - item.time * 1000);
  const min = Math.floor((ms / 1000) / 60);
  const hr = Math.floor(min / 60);
  const time = min < 60 ? min === 1 ? min + " minute"
                                    : min + " minutes"
                        : hr === 1 ? + hr + " hour"
                                     : hr + " hours";

  return <NewsItem rank={props.rank}
                   url={url}
                   title={item.title}
                   domain={domain}
                   score={item.score}
                   time={time}
                   key={item.id}
                   comments={item.descendants}
                   itemUrl={itemUrl} />
}
