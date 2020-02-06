import React from 'react';
import Trip from '../Trip/Trip';
import Calendar from '../Calendar';
import './TripList.css';

const TripsList = ({ isNew, trips, handleSelectTrip, selectedTrip, postTrip,onChange }) => {
  return (
    <>
      <Calendar
        isNew={isNew}
        trips={trips}
        selectedTrip={selectedTrip}
        handleSelectTrip={handleSelectTrip}
        postTrip={postTrip}
        onChange={onChange}
      />
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
      {trips.map((trip) => (
        <Trip
          handleSelectTrip = {handleSelectTrip}
          key={trip.id}
          trip={trip}
        />
      ))}
    </table>
    </>
  )
};


export default TripsList;
