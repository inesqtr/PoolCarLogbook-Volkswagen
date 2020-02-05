import React from 'react';
import { Link } from 'react-router-dom';

const Trip = ({ trip }) => {
    const buttonText = trip.is_finished ? 'See More' : 'Edit'

    return (
        <tbody>
            <tr>
                <td>{trip.date}</td>
                <td>{trip.time_start}</td>
                <td>{trip.driver}</td>
                <td>{trip.location_destination}</td>
                <td>
                    <button>
                        <Link to={{ pathname: `/trips/${trip.id}`, state: trip }}>
                            {buttonText}
                        </Link>
                    </button>
                </td>
            </tr>
        </tbody>
    );
}

export default Trip;