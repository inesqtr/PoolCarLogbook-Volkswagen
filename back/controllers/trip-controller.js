/* eslint-disable indent */
const Trip = require('../models/Trip');

const getAllTrips = (req, res, next) => {
    Trip.getAll((err, results) => {
        if (err) return next(err);
        return res.json({ allTrips: results });
    });
};

const createTrip = (req, res, next) => {
    Trip.create(req.body, (err) => {
        if (err) return next(err);
      return res.sendStatus(200);
    });
  };
  
  const editTrip = (req, res, next) => {
    Trip.edit(req.body, (err) => {
      if (err) return next(err);
      return res.sendStatus(200);
    });
  };
  
  const deleteTrip = (req, res, next) => {
    Trip.delete(req.body, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Trip deleted' });
    });
  };

module.exports = { 
    getAllTrips,
    createTrip,
    editTrip,
    deleteTrip,
};

