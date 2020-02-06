import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import TripsList from './TripsList/TripsList';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip';

// import Calendar from './Calendar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      isNew: true
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
    const { trips, isNew } = this.state;
    return (
      <div className="App">
        <button><Link
          to="/booking">
          Book</Link>
        </button>
        <h1>Pool Car Log Book</h1>
        {/* <Calendar/> */}
        <Route
          exact
          path="/"
          render={() => (
            <TripsList
              trips={trips}
            />
          )}
        />
        <Route
          exact
          path="/booking"
          render={() => (
            <Booking
              isNew={isNew}
            />
          )}
        />
        <Route
          path='/trips/:id'
          render={(routerProps) =>
            <EditTrip
              trip={routerProps.location.state}
              isNew={isNew}
            />}
        />
      </div>
    );
  }
}

export default App;
