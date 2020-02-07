import React from 'react';
import Moment from 'react-moment';

const Trip = ({ trip, handleSelectTrip }) => {
    //change text button if trip is finished or not
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
                <td>{trip.time_finish}</td>
                <td>{trip.driver}</td>
                <td>{trip.location_destination}</td>
                <td>
                    <button onClick={() => handleSelectTrip(trip)}>
                        {buttonText}
                    </button>
                </td>
            </tr>
        </tbody>
    );
}

export default Trip;