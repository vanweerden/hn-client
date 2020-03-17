import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// Items are accessed from HN API like so: https://hacker-news.firebaseio.com/v0/item/<id>.json
// Array of top 500 stories: https://hacker-news.firebaseio.com/v0/topstories.json

function Header(props) {
  return (
    <header>
      <div id='header-title'>React Hacker News</div>
      <div id='header-author'>by Andrew van Weerden</div>
    </header>
  );
}

// Presents info of one news item
function Card(props) {
  const item = props.item;

  // Hacker News articles do not have url in JSON
  const url = item.url ? item.url : "https://news.ycombinator.com/item?id=" + item.id;

  // Grab domain of article url (helper function below)
  // Only if it's NOT from HN
  const domain = item.url ? '(' + domainGrabber(url) + ')' : "";

  // Calculates ms since article posted (stored as UNIX timestamp)
  const ms = (Date.now() - item.time * 1000);
  const min = Math.floor((ms / 1000) / 60);
  const hr = Math.floor(min / 60);

  // String to be inserted into Card
  const time = min < 60 ? min === 1 ? min + " minute"
                                    : min + " minutes"
                        : hr === 1 ? + hr + " hour"
                                     : hr + " hours";

  return (
    <div className='card'>
      <div className='rank'>{props.rank}</div>
      <div className='article'>
        <div className='card-title'><a href={url} target='_blank' rel='noopener noreferrer' className='newslink'>{item.title}</a><span className='domain'> {domain}</span></div>
        <div className='subtitle'><span className='score'>{item.score} points</span><span className='user'> by {item.by}</span><span className='time'> {time} ago</span></div>
      </div>
    </div>
  );
}

// List of all news items: eventually use Card component to do this
function List(props) {
  const items = props.items;
  const limit = 30;  // Number of items to display on page

  // Passes each news item JSON object to Card component
  const listItems = items.map((item, i) => {
    if (i < limit) {
      return <Card item={item}
                   rank={i + 1} // Rank on website (based on array index)
                   key={item.id} />
    }
  });
  return (
    <div id='list'>{listItems}</div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
      // Top stories should be kept here in JSON format
      this.state = {
        stories: [],
      };
  }

  componentDidMount() {
    // Fetch array of IDs and store in variable
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then( data => {
        console.log("Top story IDs: ", data);

        // Make a request for first item in data arr and append to this.state
        // In future: change to forEach()
        data.forEach( id => {
          let url = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
          fetch(url)
            .then(item => item.json())
            .then(data => {
              let updatedStories = this.state.stories.concat(data);
              this.setState({
                stories: updatedStories
              });
            })
            .catch(err => console.log("ERROR: ", err.message));
        });
      })
      .catch(err => console.log("ERROR: ", err.message));
  }

  render() {
    return (
      <div id="app">
        <Header />
        <List items={this.state.stories} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// Helper function: grabs domain and top-level domain from url
function domainGrabber(url) {
  let regex = /(http(s)?:\/\/(www.)?)([a-zA-Z0-9-]+[\w.]+)(\/)?/;
  let result = url.match(regex);
  if (result) return result[4];
  else console.log("Something went wrong with URL grabber");
}
