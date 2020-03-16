import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// Items are accessed like so: https://hacker-news.firebaseio.com/v0/item/<id>.json
// Array of top 500 stories: https://hacker-news.firebaseio.com/v0/topstories.json

// Will present news item info prettily
class Card extends React.Component {
  render() {
    return <div></div>
  }
}

// List of all news items: eventually use Card component to do this
class List extends React.Component {
  render() {
    return (
      <div>
        <h1>Top News Stories</h1>
        {this.props.items.map( item => (
          <div className="card">
            <div className="title">{item.title}</div>
            <div className="info">{item.score} points by {item.by}</div>
          </div>
        ))}
      </div>
    )
  }
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
        let url = 'https://hacker-news.firebaseio.com/v0/item/' + data[0] + '.json';
        console.log(url);
        fetch(url)
          .then(item => item.json())
          .then(data => {
            let updatedStories = this.state.stories.concat(data);
            this.setState({
              stories: updatedStories
            });
            console.log(this.state);
          })
          .catch(err => console.log("ERROR: ", err.message));
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
