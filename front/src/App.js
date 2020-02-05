import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
import TripsList from './TripsList/TripsList';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip';

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
    // console.log(trips);
    return (
      <div className="App">
        <button><Link
          to="/book">
          /Book</Link>
        </button>
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
              <Booking />
            </>
          )}
        />
        <Route path='/trips/:id' render={(routerProps) => <EditTrip trip={routerProps.location.state} />} />
      </div>
    );
  }
}

export default App;
