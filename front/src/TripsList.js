import React from 'react';
import { Link } from 'react-router-dom';
import './TripList.css';

const trips = [{
  id: 1, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
}, {
  id: 2, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
},
{
  id: 3, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
},
{
  id: 4, date: '2020-02-15', time: '15.30 - 16.30', name: 'Alexandra', destination: 'Porto',
}];

const TripsList = () => {

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
        <td>{trip.time}</td>
        <td>{trip.name}</td>
        <td>{trip.destination}</td>
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
