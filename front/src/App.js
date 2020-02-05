import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import TripsList from './TripsList';
import Book from './Book';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/trips`)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          ...state,
          trips: data.allTrips
        }));
      }
      )
  };


  render() {
    const { trips } = this.state;
    return (
      <div className="App">
        <h1>Pool Car Log Book</h1>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <TripsList
                trips={trips}
              />
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
