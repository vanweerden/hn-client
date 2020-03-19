import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

function Header(props) {
  return (
    <header>
      <div id='header-title'>React Hacker News</div>
      <div id='header-author'>by Andrew van Weerden</div>
    </header>
  );
}

// Presents info of a single news item
function NewsItem(props) {
  const item = props.item;

  // Hacker News articles do not have url in JSON
  const url = item.url ? item.url : "https://news.ycombinator.com/item?id=" + item.id;

  // Grab domain of article url if not from HN (helper function below)
  const domain = item.url ? '(' + domainGrabber(url) + ')' : "";

  const ms = (Date.now() - item.time * 1000);
  const min = Math.floor((ms / 1000) / 60);
  const hr = Math.floor(min / 60);

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

function NewsList(props) {
  const stories = props.stories;  // array of JSON news items
  const pageLimit = 25; // No. of stories to display per page
  let page = props.pageNumber; // Increments/decrements when 'Next' and 'Prev' buttons
  let lastEntry = page * pageLimit;
  let firstEntry = lastEntry - (pageLimit - 1);

  // Uses array of JSON news items to generate Card for each
  const listItems = stories
    .slice((firstEntry - 1), lastEntry)
    .map((item, i) => {
      const rank = pageLimit * (page - 1) + (i + 1);
      return (
        <NewsItem item={item}
              rank={rank}
              key={item.id} />
      );
  });

  return (
    <div id='list'>{listItems}</div>
  )
}

// shouldDisplay hard-coded for now
// checks should be made dynamic (base on number per page and last entry)
function Button(props) {
  if (props.shouldDisplay) {
    return (
      <button className="navButton"
              onClick={props.onClick}>
              {props.value}
     </button>
    );
  } else {
    return null;
  }
}

function PageNav(props) {
  return (
    <div id="pageNav">
      <Button
        value="Prev"
        onClick={props.handlePrev}
        page={props.page}
        shouldDisplay={props.page > 1}
        />
      <Button
        value="Next"
        onClick={props.handleNext}
        page={props.page}
        shouldDisplay={props.page < 20}
      />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      pageNumber: 1
    };
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

  componentDidMount() {
    // Fetch array of IDs and store in variable
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then( res => res.json() )
      .then( data => {
        console.log("Top story IDs: ", data);

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
        <NewsList
          stories={this.state.stories}
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

ReactDOM.render(<App />, document.getElementById('root'));

// Helper function: grabs domain and top-level domain from url
function domainGrabber(url) {
  let regex = /(http(s)?:\/\/(www.)?)([a-zA-Z0-9-]+[\w.]+)(\/)?/;
  let result = url.match(regex);
  if (result) return result[4];
  else console.log("Something went wrong with URL grabber");
}
