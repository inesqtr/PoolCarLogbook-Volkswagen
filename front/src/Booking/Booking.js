import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import './Booking.css';

const Booking = ({ isNew, postTrip, onChange, trips }) => {
  return (
    <section className="booking-page">
      <Link to="/" className='backButton'>Go Back</Link>
      <h2>Book a trip</h2>
      <Form
        isNew={isNew}
        postTrip={postTrip}
        onChange={onChange}
        trips={trips}
      />
    </section>
  );
}
export default Booking;
