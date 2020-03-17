import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// Items are accessed like so: https://hacker-news.firebaseio.com/v0/item/<id>.json
// Array of top 500 stories: https://hacker-news.firebaseio.com/v0/topstories.json

// Will present news item info prettily
class Card extends React.Component {
  render() {
    return
    <div>

    </div>
  }
}

// List of all news items: eventually use Card component to do this
function List(props) {
  const items = props.items;
  const limit = 30;  // Number of items to display on page
  const listItems = items.map((item, i) => {
    if (i < limit) {
      return <li key={item.id}>{item.title}</li>
    }
  });
  return (
    <div>
      <h1>Top News Stories</h1>
      <ol>{listItems}</ol>
    </div>
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
