import React, { Component } from 'react';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import './App.css';
import TripsList from './TripsList/TripsList';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip';
import logo from './assets/images/vwds_rgb.png';
import AggregatedKmMonth from './AggregatedKmMonth';
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
      kmMonth: 0
    };
  }

  componentDidMount() {
    this.getAllTrips()
    this.getAggregatedKmMonth()
  };


  //fetch to get all info from database
  getAllTrips = () => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/trips`)
      .then(response => response.json())
      .then(data => {
        const caltrips = data.allTrips.map(trip => (
          {
            _id: trip.id,
            name: trip.driver,
            startDateTime: new Date(trip.date.split('00:00:00').join(trip.time_start)),
            endDateTime: new Date(trip.date.split('00:00:00').join(trip.time_finish)),
            classes: 'color-VWpetrollight'
          }
        ))
        this.setState(state => ({
          ...state,
          trips: data.allTrips,
          tripsForCalendar: caltrips
        }));
      })
  }
  
  getAggregatedKmMonth = () => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/trip/kmmonth`)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          ...state,
          kmMonth: data.aggregatedKmMonth
        }));
      })
  }


  //fetch to post booking info (create on database) 
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

  //fetch to edit booking info on database
  editTrip = (newTrip) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/trip/edit`,
      {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
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
          "id": +newTrip.id
        }),
      })
      .then(res => {

        if (res.status === 200) {
          this.getAllTrips()
            .then(
              () => this.props.history.push("/tripslist")
            )
        }
      });
  }

  //fetch to delete booking info
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
            () => this.props.history.push("/tripslist")
          )
      }
    });
  }

  handleSelectTrip = (trip) => {
    this.setState({
      selectedTrip: trip
    }, () => this.props.history.push(`/trips/${trip.id}`))
  }

  //filter information by driver on the trips list dropdown
  filterByDriver = (e) => {
    const checkAll = e.value === 'all' ? false : true
    const filtered = this.state.trips.filter(trip => trip.driver === e.value);
    this.setState({
      tripsByDriver: filtered,
      isFiltered: checkAll
    })
  }


  render() {
    const { trips, isNew, selectedTrip, tripsForCalendar, tripsByDriver, isFiltered, kmMonth } = this.state;
    return (
      <div className="App">
        <header>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </header>
        <h1>POOL CAR LOGBOOK</h1>

        <div className="home-buttons">
          <Link to="/booking">
            <button>
              Book
            </button>
          </Link>

          <Link to="/tripslist">
            <button>
              See All Trips
            </button>
          </Link>
          <Link to="/kmmonth">
            <button>
              Aggregated Data
            </button>
          </Link>
        </div>

        <Switch>
          <Route
            exact path="/"
            render={() => (
              < Calendar
                tripsForCalendar={tripsForCalendar}
                isNew={isNew}
                trips={trips}
                handleSelectTrip={this.state.handleSelectTrip}
                editTrip={this.editTrip}
                postTrip={this.postTrip}
                deleteTrip={this.deleteTrip}
              />
            )}
          />

          <Route
            exact
            path="/tripslist"
            render={() => (
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
                deleteTrip={this.deleteTrip}
              />
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
                trips={trips}
              />
            )}
          />
          <Route
            exact
            path="/kmmonth"
            render={() => (
              <AggregatedKmMonth
                kmMonth={kmMonth}
              />
            )}
          />

          <Route
            path='/trips/:id'
            render={(routerProps) =>
              <EditTrip
                // trip={routerProps.location.state}
                trips={trips}
                isNew={isNew}
                selectedTrip={selectedTrip}
                editTrip={this.editTrip}
                deleteTrip={this.deleteTrip}
              />}
          />
        </Switch>
      </div >
    );
  }
}

export default withRouter(App);
