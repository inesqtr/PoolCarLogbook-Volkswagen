import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const EditTrip = ({ isNew, trip, selectedTrip, editTrip, deleteTrip,trips }) => {
  return (
    <div>
      <Link to="/" className='backButton'>Go Back</Link>
      <h2>Your Trip</h2>
      <Form
        isNew={!isNew}
        trip={trip}
        selectedTrip={selectedTrip}
        editTrip={editTrip}
        deleteTrip={deleteTrip}
        trips={trips}
      />
    </div>
  );
}


export default EditTrip;
