import React from 'react';
import './Form.css';
import Select from 'react-select';

const car = [{ licence_plate: '97-OZ-56' }, { licence_plate: '32-LW-35' }];

const Form = () => (
  <div className="form">
    <label className="form">
          Name:
      <input
        type="text"
      />
    </label>
    <label className="form">
          Date:
      <input
        type="text"
      />
    </label>
    <label>
          Time:
      <input
        type="text"
      />
    </label>
    <label>
          Car:
      <Select // change placeholder to the current lang based on Product
        classNamePrefix="select"
        options={car.map((item) => ({ value: item.licence_plate, label: item.licence_plate }))}
      />
    </label>
    <label>
          Kms:
      <input
        type="text"
      />
    </label>
    <label>
          Destination:
      <input
        type="text"
      />
    </label>
    <label>
          Observations:
      <textarea
        className="obs-textbox"
      />
    </label>
  </div>
);
export default Form;
