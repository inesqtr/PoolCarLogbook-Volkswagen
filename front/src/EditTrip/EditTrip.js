import React from 'react';
import Form from '../Form/Form';

const EditTrip = ({ isNew, trip }) => {
  return (
    <div>
      <h2>Your Trip</h2>
      <Form
        isNew={!isNew}
        trip={trip}
      />
    </div>
  );
}


export default EditTrip;
