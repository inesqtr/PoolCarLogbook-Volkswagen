import React from 'react';
import { Link } from 'react-router-dom';

const Trip = ({ trip }) => {
    const tripDetails = (id) => {
        console.log("i was clicked")
    }

    return (
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
    );
}

export default Trip;