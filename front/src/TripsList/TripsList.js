import React from 'react';
import Trip from '../Trip/Trip';
import './TripList.css';

const TripsList = ({ trips }) => {

  return (
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
          key={trip.id}
          trip={trip}
        />
      ))}
    </table>
  )
};
export default TripsList;
