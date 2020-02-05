import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import TripsList from './TripsList';
import Book from './Book';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <h1>Pool Car Log Book</h1>
        <Route
          exact
          path="/trips_list"
          render={() => (
            <>
              <TripsList />
            </>
          )}
        />
        <Route
          exact
          path="/book"
          render={() => (
            <>
              <Book />
            </>
          )}
        />
      </div>
    );
  }
}

export default App;
