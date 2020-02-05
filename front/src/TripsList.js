import React from 'react';
import { Link } from 'react-router-dom';
import './TripList.css';

// const trips = [{
//   id: 1, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
// }, {
//   id: 1, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
// },
// {
//   id: 1, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
// },
// {
//   id: 1, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
// }];

const TripsList = ({ trips }) => (
  <table className="tftable" border="1">
    <thead>
      <th>Date</th>
      <th>Time</th>
      <th>Name</th>
      <th>Destination</th>
      <th>Edit</th>
    </thead>
    {trips.map((trip) => (
      <tbody key={trip.id}>
        <td>{trip.date}</td>
        <td>{trip.time_start}</td>
        <td>{trip.driver}</td>
        <td>{trip.location_destination}</td>
        <td>
          <Link to="/">
            {/* UPDATE PATH */}
            Edit
          </Link>
        </td>
      </tbody>
    ))}
  </table>
);
export default TripsList;
