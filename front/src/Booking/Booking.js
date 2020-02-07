import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const Booking = ({ isNew, postTrip, onChange, selectedDateTime, trips }) => {
  return (
    <section className="booking-page">
      <Link to="/" className='backButton'>Go Back</Link>
      <h2>Book a trip</h2>
      <Form
        selectedDateTime={selectedDateTime}
        isNew={isNew}
        postTrip={postTrip}
        onChange={onChange}
        trips={trips}
      />
    </section>
  );
}
export default Booking;
