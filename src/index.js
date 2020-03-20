import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// Components
import { Header } from './components/Header';
import { NewsFetch } from './components/NewsFetch';

const App = () => (
  <div id="app">
    <Header />
    <NewsFetch />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
