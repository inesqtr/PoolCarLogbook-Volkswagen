import React from 'react';
import Form from '../Form/Form';

const Booking = ({ isNew }) => {
  return (
    <div>
      <h2>Book a trip</h2>
      <Form
        isNew={isNew}
      />
    </div>
  );
}
export default Booking;
