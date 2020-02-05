/* eslint-disable indent */
const Trip = require('../models/Trip');

const getAllTrips = (req, res, next) => {
    Trip.getAllTrips((err, results) => {
        if (err) return next(err);
        return res.json({ allTrips: results });
    });
};


module.exports = { getAllTrips };

