import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import './App.css';
import TripsList from './TripsList/TripsList';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      selectedTrip: {},
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

  handleSelectTrip = (trip) => {
    console.log('trip', trip)
    this.setState({
      selectedTrip: trip
    }, () => this.props.history.push(`/trips/${trip.id}`))
  }


  render() {
    const { trips, isNew, selectedTrip } = this.state;
    return (
      <div className="App">
        <button><Link
          to="/booking">
          Book</Link>
        </button>
        <h1>Pool Car Log Book</h1>
          
        <Route
          exact
          path="/"
          render={() => (
            <>
              <TripsList
                trips={trips}
                selectedTrip={selectedTrip}
                handleSelectTrip={this.handleSelectTrip}
              />
            </>
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
            selectedTrip={selectedTrip}
          />}
        />
      </div>
    );
  }
}

export default withRouter(App);
