import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const EditTrip = ({ isNew, trip }) => {
  return (
    <div>
      <Link to="/" className='backButton'>Go Back</Link>
      <h2>Your Trip</h2>
      <Form
        isNew={!isNew}
        trip={trip}
      />
    </div>
  );
}


export default EditTrip;
