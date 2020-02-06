import React, { Component } from 'react';
import './Form.css';
import Select from 'react-select';
import { withRouter } from 'react-router-dom'


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      date: "",
      time_start: "",
      time_finish: "",
      kms_start:"",
      kms_finish:"",
      location_start: "Rato",
      location_destination: "",
      observations: "",
      is_finished: 0,
      car_id:1,
      licence_plate: "72-VZ-96",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  postForm = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/trip/create`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        "driver": this.state.name,
        "date": this.state.date,
        "time_start": this.state.time_start,
        "time_finish": this.state.time_finish,
        "kms_start": +this.state.kms_start,
        "kms_finish": +this.state.kms_finish,
        "location_start": this.state.location_start,
        "location_destination": this.state.location_destination,
        "observations": this.state.observations,
        "is_finished": +this.state.is_finished,
        "car_id": +this.state.car_id,
      })
    }).then(res => {
      
      if(res.status=== 200) {
        this.props.history.push("/")
      }
    });
  };

  render() {

    console.log(this.state)
    return(

      <div className="form">
      <div>
      <label className="form">
      Name:
      <input
      type="text"
      name="name"
      value={this.state.name}
      onChange={this.onChange}
      />
      </label>
      </div>
      
      <div>
      <label className="form">
      Date:
      <input
      type="date"
      name="date"
      min="2010-01-01"
      max="2049-12-31"
      pattern="\d{4}-\d{2}-\d{2}" // unsuported browsers fallback
      required
      onChange={this.onChange}
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
      />
      </label>
      </div>
      
      <div>
      <label>
      Car:
      {/* <Select
      classNamePrefix="select"
      options={car.map((item) => ({ value: item.licence_plate, label: item.licence_plate }))}
      onChange={this.onChange}/>
      /> */}
      </label>
      </div>
      
      <div>
      <label>
      Kms start:
      <input
      name="kms_start"
      type="text"
      onChange={this.onChange}
      />
      </label>
      </div>
      <div>
      <label>
      Kms finish:
      <input
      name="kms_finish"
      type="text"
      onChange={this.onChange}
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
      />
      </label>
      </div>
      
      <div>
      <button
      onClick={this.postForm}>
      Save
      </button>
      </div>
      </div>

      )}};
      
      export default withRouter(Form);
      