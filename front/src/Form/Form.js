import React from 'react';
import './Form.css';
import Select from 'react-select';

const car = [{ licence_plate: '97-OZ-56' }, { licence_plate: '32-LW-35' }];

const Form = () => (
  <div className="form">
    <div>
    <label className="form">
          Name:
      <input
        type="text"
        />
    </label>
    </div>

    <div>
    <label className="form">
          Date:
      <input
        type="text"
        />
    </label>
    </div>

    <div>
    <label>
          Time:
      <input
        type="text"
        />
    </label>
    </div>

    <div>
    <label>
          Car:
      <Select
        classNamePrefix="select"
        options={car.map((item) => ({ value: item.licence_plate, label: item.licence_plate }))}
        />
    </label>
    </div>

    <div>
    <label>
          Kms:
      <input
        type="text"
        />
    </label>
    </div>

    <div>
    <label>
          Destination:
      <input
        type="text"
        />
    </label>
    </div>

    <div>
    <label>
          Observations:
      <textarea
        className="obs-textbox"
        />
    </label>
    </div>
  </div>
);
export default Form;
