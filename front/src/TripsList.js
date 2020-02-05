import React from 'react';
import { Link } from 'react-router-dom';
import './TripList.css';

const TripsList = ({ trips }) => {

  const tripDetails = (id) => {
    console.log("i was clicked")
  }
  
return(
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
      <tbody 
        key={trip.id}
        onClick={() => tripDetails(trip.id)}>
        <tr>
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
        </tr>
      </tbody>
    ))}
  </table>
)};
export default TripsList;
