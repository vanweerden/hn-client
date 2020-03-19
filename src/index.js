import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const Header = (props) => {
  return (
    <header>
      <div id='header-title'>React Hacker News</div>
      <div id='header-author'>by Andrew van Weerden</div>
    </header>
  );
}

// Split into Container and Presentational
const NewsItem = (props) => {
  const item = props.item;

  // Hacker News articles do not have url in JSON object
  const url = item.url ? item.url : "https://news.ycombinator.com/item?id=" + item.id;
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

// TODO: Split into Presentational and Container
const NewsList = (props) => {
  const stories = props.stories;
  const pageLimit = 25;
  let page = props.pageNumber;
  let lastEntry = page * pageLimit;
  let firstEntry = lastEntry - (pageLimit - 1);

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

const Button = (props) => {
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

const PageNav = (props) => {
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

// TODO: break up page number handling and JSON data handling
class NewsContainer extends React.Component {
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

        // Fetch news story using each ID and push to state
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
      <div id="newsContainer">
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

const App = () => (
  <div id="app">
    <Header />
    <NewsContainer />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Helper function: grabs domain and top-level domain from url
function domainGrabber(url) {
  let regex = /(http(s)?:\/\/(www.)?)([a-zA-Z0-9-]+[\w.]+)(\/)?/;
  let result = url.match(regex);
  if (result) return result[4];
  else console.log("Something went wrong with URL grabber");
}
