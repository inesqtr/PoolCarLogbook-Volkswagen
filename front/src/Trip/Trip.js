import React from 'react';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Trip = ({ trip, handleSelectTrip }) => {
    const buttonText = trip.is_finished ? 'See More' : 'Edit'
 
    return (
        <tbody>
            <tr>
                <td>
                    <Moment format="YYYY/MM/DD">
                        {trip.date}
                    </Moment>
                </td>
                <td>{trip.time_start}</td>
                <td>{trip.driver}</td>
                <td>{trip.location_destination}</td>
                <td>
                    <button
                    onClick={()=> handleSelectTrip(trip)}>
                        {buttonText}
                    </button>
                </td>
            </tr>
        </tbody>
    );
}

export default Trip;