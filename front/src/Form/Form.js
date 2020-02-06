import React, { Component } from 'react';
import './Form.css';
import Select from 'react-select';
import { withRouter, Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap';


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
      licence_plate: "72-VZ-96",
      newTrip: {}
    };
  }

  componentDidMount(){
    if(this.props.selectedTrip){
      this.setState({
        name: this.props.selectedTrip.driver,
        date: this.props.selectedTrip.date,
        time_start: this.props.selectedTrip.time_start,
        time_finish: this.props.selectedTrip.time_finish,
        kms_start: this.props.selectedTrip.kms_start,
        kms_finish: this.props.selectedTrip.kms_finish,
        location_start: this.props.selectedTrip.location_start,
        location_destination: this.props.selectedTrip.location_destination,
        observations: this.props.selectedTrip.observations,
        is_finished: this.props.selectedTrip.is_finished,
        car_id: this.props.selectedTrip.car_id,
      })
    }
  }

  onChange = (e) => {
    let value = e.target.value;
    // if([e.target.name] === 'date'){
    //   // const small = value.subst(0,5)
    //   this.setState(
    //     {date: small}
    //   )
    // }else 
    this.setState(
      {[e.target.name]: value}
    )
  }

  showCheckbox = () => {
    if (this.props.isNew) return '';
    if (!this.props.isNew && this.props.trip.is_finished) return '';
    if (!this.props.isNew) {
      return <div>
        <label for="checkbox">I've finished the trip</label>
        <input
          id="checkbox"
          name="checkedFinish"
          type="checkbox"
          onChange={this.onChange} />
      </div>
    }
  }

  hideDeleteButton = () => {
    if (this.props.isNew) return '';
    if (!this.props.isNew && this.props.trip.is_finished) return ''
    return <button>Delete</button>
  }
  
  hideSubmitButton = () => {
    if (this.props.isNew) return <button onClick={this.handleSubmit}>Save</button>
    if (!this.props.isNew && this.props.trip.is_finished) return ''
    return <button onClick={this.handleSubmit}>Edit</button>
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {selectedTrip, editTrip, postTrip } = this.props;
    const {name, 
      date, 
      time_start, 
      time_finish, 
      kms_start, 
      kms_finish, 
      location_start, 
      location_destination, 
      observations, 
      is_finished, 
      car_id, 
      newTrip } = this.state

    this.setState({newTrip: {name, 
      date, 
      time_start, 
      time_finish, 
      kms_start, 
      kms_finish, 
      location_start, 
      location_destination, 
      observations, 
      is_finished, 
      car_id }}, () => {
      if(selectedTrip && selectedTrip.id){
        editTrip()
      }else{
        console.log('newTrip', newTrip)
        postTrip(newTrip)
      }}
      )
  }


  render() {
    console.log(this.state.date, 'date')
    const { name, 
            date, 
            time_start, 
            time_finish, 
            kms_start, 
            kms_finish, 
            location_start, 
            location_destination, 
            observations, 
            is_finished, 
            car_id 
          } = this.state;

    return (
      <Container>
        <form className="col-md-6 offset-md-3">
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

          {/* <div>
      <label>
      Car:
      <Select
      classNamePrefix="select"
      options={car.map((item) => ({ value: item.licence_plate, label: item.licence_plate }))}
      onChange={this.onChange}/>
      />
      </label>
      </div> */}


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
              Destination:
              <input
                name="location_destination"
                type="text"
                onChange={this.onChange}
                value={location_destination}
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

