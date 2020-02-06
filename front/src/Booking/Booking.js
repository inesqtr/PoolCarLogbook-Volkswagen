import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const Booking = () => (
  <div>
    <Link to="/" className='backButton'>Go Back</Link>
    <h2>Book a trip</h2>
    <Form />
  </div>
);
export default Booking;
