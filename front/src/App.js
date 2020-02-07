import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import './App.css';
import TripsList from './TripsList/TripsList';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip';

import Calendar from './Calendar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripsByDriver: [],
      selectedTrip: {},
      tripsForCalendar: [],
      isNew: true,
      isFiltered: false,
    };
  }

  getAllTrips =  () => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/trips`)
    .then(response => response.json())
    .then(data => {
      const caltrips = data.allTrips.map( trip => (
          {
            _id           : trip.id,
            name          : trip.driver,
            startDateTime : new Date(trip.date.split('00:00:00').join(trip.time_start)),
            endDateTime   : new Date(trip.date.split('00:00:00').join(trip.time_finish)),
            classes       : 'color-1'
          }
        ))
        this.setState(state => ({
          ...state,
          trips: data.allTrips,
          tripsForCalendar: caltrips
        }));
      })
  } 

  componentDidMount() {
    this.getAllTrips()
  };

  postTrip = (newTrip) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/trip/create`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        "driver": newTrip.name,
        "date": newTrip.date,
        "time_start": newTrip.time_start,
        "time_finish": newTrip.time_finish,
        "kms_start": +newTrip.kms_start,
        "kms_finish": +newTrip.kms_finish,
        "location_start": newTrip.location_start,
        "location_destination": newTrip.location_destination,
        "observations": newTrip.observations,
        "is_finished": +newTrip.is_finished,
        "car_id": +newTrip.car_id,
      })
    }).then(res => {
      if (res.status === 200) {
        this.getAllTrips()
        .then(
          () => this.props.history.push("/")
        )
      }
    });
  };

  editTrip = (newTrip) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/trip/edit`,
    {
        method:  'PUT',
        headers:  new Headers({
                'Content-Type':  'application/json'
        }),
        body:  JSON.stringify({
          "driver": newTrip.name,
          "date": newTrip.date,
          "time_start": newTrip.time_start,
          "time_finish": newTrip.time_finish,
          "kms_start": +newTrip.kms_start,
          "kms_finish": +newTrip.kms_finish,
          "location_start": newTrip.location_start,
          "location_destination": newTrip.location_destination,
          "observations": newTrip.observations,
          "is_finished": +newTrip.is_finished,
          "car_id": +newTrip.car_id,
          "id": +newTrip.id
        }),
    })
    .then(res => {

      if (res.status === 200) {
        this.getAllTrips()
        .then(
          () => this.props.history.push("/")
        )
      }
    });
}

  deleteTrip = (newTrip) => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/trip/delete`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          "id": +newTrip.id
        })
      })
      .then(res => {

        if (res.status === 200) {
          this.getAllTrips()
          .then(
            () => this.props.history.push("/")
          )
        }
      });
  }

  handleSelectTrip = (trip) => {
    this.setState({
      selectedTrip: trip
    }, () => this.props.history.push(`/trips/${trip.id}`))
  }

  filterByDriver = (e) => {
    const checkAll = e.value === 'all' ? false : true
    const filtered = this.state.trips.filter(trip => trip.driver === e.value);
    this.setState({
      tripsByDriver: filtered,
      isFiltered:checkAll
    })
  }


  render() {
    const { trips, isNew, selectedTrip, tripsForCalendar, tripsByDriver, isFiltered } = this.state;
    return (
      <div className="App">
        <button><Link
          to="/booking">
          Book</Link>
        </button>
        <h1>Pool Car Log Book</h1>

        < Calendar
          tripsForCalendar={tripsForCalendar}
          isNew={isNew}
          trips={trips}
          selectedTrip={selectedTrip}
          handleSelectTrip={this.state.handleSelectTrip}
          editTrip={this.editTrip}
          //triplocation={routerProps.location.state}
          editTrip={this.editTrip}
        />

        <Route
          exact
          path="/"
          render={() => (
            <>
              <TripsList
                tripsForCalendar={tripsForCalendar}
                trips={trips}
                tripsByDriver={tripsByDriver}
                selectedTrip={selectedTrip}
                handleSelectTrip={this.handleSelectTrip}
                filterByDriver={this.filterByDriver}
                isFiltered={isFiltered}
                isNew={isNew}
                postTrip={this.postTrip}
                onChange={this.onChange}
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
              postTrip={this.postTrip}
              onChange={this.onChange}
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
              editTrip={this.editTrip}
              deleteTrip={this.deleteTrip}
            />}
        />
      </div>
    );
  }
}

export default withRouter(App);
