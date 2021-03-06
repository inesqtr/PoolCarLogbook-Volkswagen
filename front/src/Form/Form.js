import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import './Form.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      time_start: "",
      time_finish: "",
      kms_start: 0,
      kms_finish: 0,
      location_start: "Rato",
      location_destination: "",
      observations: "",
      is_finished: 0,
      car_id: 1,
      licence_plate: "Select car...",
      id: "",
      newTrip: {}
    };
  }
  
  componentDidMount() {
    console.log('this.props.selectedTrip', this.props.selectedTrip)
    if (this.props.selectedTrip && (Object.keys(this.props.selectedTrip).length !== 0)) {
      this.setState({
        name: this.props.selectedTrip.driver,
        date: this.props.selectedTrip.date.split('T')[0],
        time_start: this.props.selectedTrip.time_start,
        time_finish: this.props.selectedTrip.time_finish,
        kms_start: this.props.selectedTrip.kms_start,
        kms_finish: this.props.selectedTrip.kms_finish,
        location_start: this.props.selectedTrip.location_start,
        location_destination: this.props.selectedTrip.location_destination,
        observations: this.props.selectedTrip.observations,
        is_finished: this.props.selectedTrip.is_finished,
        car_id: this.props.selectedTrip.car_id,
        licence_plate: this.props.selectedTrip.licence_plate,
        id: this.props.selectedTrip.id,
      })
    } else if (this.props.selectedDateTime) {
      // if booking from Calendar click, prefill date and start time inputs
      this.setState({
        date: this.props.selectedDateTime[0][0],
        time_start: this.props.selectedDateTime[0][1],
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // on changing the car dropdown
  onChangeSelect = (e) => {
    this.setState({
      car_id: e.value,
    })
  }

  //link to itinerary map
  seeTripItinerary = () => {
    if (this.props.isNew) return '';
    return <div className="itinerary">
      <a href={`https://www.google.com/maps/dir/Volkswagen+Digital+Solutions,+Unipessoal+Lda,+Rua+do+Sol+ao+Rato+11,+1250-018+Lisboa/${encodeURI(this.props.selectedTrip.location_destination)}/Volkswagen+Digital+Solutions,+Unipessoal+Lda,+Rua+do+Sol+ao+Rato+11,+1250-018+Lisboa`} target="_blank">
        See trip itinerary
      </a>
    </div>
  }

  //render checkbox if trip is not finished
  showCheckbox = () => {
    if (this.props.isNew) return '';
    if (!this.props.isNew && this.props.selectedTrip.is_finished) return '';
    if (!this.props.isNew) {
      return <div>
        <label for="checkbox">I've finished the trip</label>
        <input
          value={this.state.is_finished}
          id="checkbox"
          name="is_finished"
          type="checkbox"
          onChange={this.onChangeCheckbox} />
      </div>
    }
  }


  onChangeCheckbox = () => {
    this.setState({is_finished: 1})
  }
  //show delete button if trip is not finished
  hideDeleteButton = () => {
    if (this.props.isNew) return '';
    if (!this.props.isNew && this.props.selectedTrip.is_finished) return ''
    return <button onClick={() => this.props.deleteTrip(this.props.selectedTrip)}>Delete</button>
  }

  //show save/edit/none button if booking/editing/finished trip
  hideSubmitButton = () => {
    if (this.props.isNew) return <button onClick={this.handleSubmitNew}>Save</button>
    if (!this.props.isNew && this.props.selectedTrip.is_finished) return ''
    return <button onClick={this.handleSubmitEdit}>Save changes</button>
  }

  saveNewTrip = (aftersetState) => {
    const newT = {
      name: this.state.name,
      date: this.state.date,
      time_start: this.state.time_start,
      time_finish: this.state.time_finish,
      kms_start: this.state.kms_start,
      kms_finish: this.state.kms_finish,
      location_start: this.state.location_start,
      location_destination: this.state.location_destination,
      observations: this.state.observations,
      is_finished: this.state.is_finished,
      car_id: this.state.car_id,
      id: this.state.id
    }
    this.setState({ newTrip: newT}, aftersetState);
  }

  handleSubmitNew = (e) => {
    e.preventDefault();
    const { postTrip } = this.props;
    this.saveNewTrip(() => postTrip(this.state.newTrip))
    if (this.props.closeModal) this.handleCloseModal();
  }

  handleSubmitEdit = (e) => {
    e.preventDefault();
    const { editTrip } = this.props;
    this.saveNewTrip(() => editTrip(this.state.newTrip))
    if (this.props.closeModal) this.handleCloseModal();
  }
  
  handleSubmitDelete = (e) => {
    e.preventDefault();
    const { deleteTrip } = this.props;
    if (this.props.closeModal) this.handleCloseModal();
    this.saveNewTrip(() => deleteTrip(this.state.newTrip))
  }

  handleCloseModal = () => {
    this.props.closeModal();
  }

  render() {
    const { 
      name,
      date,
      time_start,
      time_finish,
      kms_start,
      kms_finish,
      location_destination,
      observations,
      licence_plate,
      car_id
    } = this.state;
    return (
      <Container>
        <form className="col-md-10 offset-md-1">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>
              Date:
              <input
                type="date"
                name="date"
                min="2020-01-01"
                max="2049-12-31"
                pattern="\d{4}-\d{2}-\d{2}" // unsuported browsers fallback
                required
                onChange={this.onChange}
                value={date}
              />
            </label>
          </div>

          <div>
            <label>
              Time start:
              <input
                type="time"
                name="time_start"
                pattern="[0-9]{2}:[0-9]{2}" // unsuported browsers fallback
                required
                onChange={this.onChange}
                value={time_start}
              />
            </label>
          </div>
          <div>
            <label>
              Time finish:
              <input
                type="time"
                name="time_finish"
                pattern="[0-9]{2}:[0-9]{2}"
                required
                onChange={this.onChange}
                value={time_finish}
              />
            </label>
          </div>

          <div>
      <label>
      Car:
      </label>
      <Select
        classNamePrefix="select"
        name="licence_plate"
        options={this.props.trips.reduce((acc, curr) => {
          if (acc.includes(curr.licence_plate+curr.car_id)) {
            return acc;
          } else {
            return [
              ...acc,
              curr.licence_plate+curr.car_id
            ]
          }
        }
        ,
        []
        )
        .map(
          item => ({ value: item.slice(-1), label: item.slice(0, -1)}))
        }
        defaultValue={ 
          this.props.selectedTrip ? {value: this.props.selectedTrip.car_id, label: this.props.selectedTrip.licence_plate} : {value: car_id, label: licence_plate}
        }
        onChange={this.onChangeSelect}
      />
      </div>
          <div>
            <label>
              Destination:
              <input
                name="location_destination"
                type="text"
                onChange={this.onChange}
                value={location_destination}
              />
            </label>
          </div>

          {this.seeTripItinerary()}

          <div>
            <label>
              Kms start:
              <input
                name="kms_start"
                type="number"
                onChange={this.onChange}
                value={kms_start}
              />
            </label>
          </div>
          <div>
            <label>
              Kms finish:
              <input
                name="kms_finish"
                type="number"
                onChange={this.onChange}
                value={kms_finish}
              />
            </label>
          </div>

          <div>
            <label>
              Observations:
              <textarea
                name="observations"
                className="obs-textbox"
                onChange={this.onChange}
                value={observations}
              />
            </label>
          </div>

          {this.showCheckbox()}
          {this.hideSubmitButton()}
          {this.hideDeleteButton()}
        </form>
      </Container>
    )
  }
};

export default withRouter(Form);

