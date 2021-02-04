import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MovieSearchComponent from './components/MovieSearchComponent';
import MovieDetailComponent from './components/MovieDetailComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={MovieSearchComponent}></Route>
            <Route path="/detail/:id" component={MovieDetailComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
