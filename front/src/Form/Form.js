import React from 'react';
import './Form.css';
import Select from 'react-select';

const car = [{ licence_plate: '97-OZ-56' }, { licence_plate: '32-LW-35' }];

const Form = () => (
  <div className="form">
    <div>
      <label className="form">
            Name:
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
