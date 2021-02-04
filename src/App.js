import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MovieSearchComponent from './components/MovieSearchComponent';
import MovieDetailComponent from './components/MovieDetailComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/movie/search" component={MovieSearchComponent}></Route>
            <Route path="/movie/detail" component={MovieDetailComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
