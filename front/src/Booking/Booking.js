import React from 'react';
import Form from '../Form/Form';
import './Booking.css';

const Booking = ({ isNew }) => {
  return (
    <section className="booking-page">
      {/* <Link to="/" className='backButton'>Go Back</Link> */}
      <h2>Book a trip</h2>
      <Form
        isNew={isNew}
      />
    </section>
  );
}
export default Booking;
