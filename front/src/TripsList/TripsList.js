import React from 'react';
import Select from 'react-select';
import Trip from '../Trip/Trip';
import Calendar from '../Calendar';
import './TripList.css';

const TripsList = ({ tripsForCalendar, isNew, trips, filterByDriver, isFiltered, tripsByDriver, handleSelectTrip, selectedTrip, postTrip, onChange }) => {
  const tripsList = isFiltered ? tripsByDriver : trips
  const options = trips.map((trip) => ({ value: trip.driver, label: trip.driver }));

  return (
    <>
      <Calendar
        tripsForCalendar={tripsForCalendar}
        isNew={isNew}
        trips={trips}
        selectedTrip={selectedTrip}
        handleSelectTrip={handleSelectTrip}
        postTrip={postTrip}
        onChange={onChange}
      />

      <div>
        <label>Search by Driver:</label>
        <Select
          classNamePrefix="select"
          options={[{value:'all', label: 'All'}, {options} ]}
          onChange={(e) => filterByDriver(e)}
        />
      </div>

      <table className="tftable" border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Destination</th>
            <th>Edit</th>
          </tr>
        </thead>
        {tripsList.map((trip) => (
          <Trip
            handleSelectTrip={handleSelectTrip}
            key={trip.id}
            trip={trip}
          />
        ))}
      </table>
    </>
  )
};


export default TripsList;
