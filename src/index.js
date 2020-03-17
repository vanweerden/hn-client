import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// Items are accessed like so: https://hacker-news.firebaseio.com/v0/item/<id>.json
// Array of top 500 stories: https://hacker-news.firebaseio.com/v0/topstories.json

// Presents info of one news item
function Card(props) {
  const item = props.item;

  // Calculates ms since it was posted (stored as UNIX timestamp)
  const ms = (Date.now() - item.time * 1000);
  const min = Math.floor((ms / 1000) / 60);
  const hr = Math.floor(min / 60);

  // If posted less than an hour ago, post minutes, else hours
  const time = min < 60 ? min + " minutes"
                        // Handle plurality of hours
                        : hr === 1 ? + hr + " hour"
                                     : hr + " hours";

  return (
    <div className="card">
      <div className="title"><span className="rank">{props.rank}</span><a href={item.url} target='_blank' className="storylink">{item.title}</a><span className='website'></span></div>

      <div className="subtitle"><span className="score">{item.score} points</span><span className="user"> by {item.by}</span><span className="time"> {time} ago</span></div>
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
    <div>{listItems}</div>
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
      <div>
        <List items={this.state.stories} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
