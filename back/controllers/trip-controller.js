/* eslint-disable indent */
const Trip = require('../models/Trip');

const getAllTrips = (req, res, next) => {
    Trip.getAll((err, results) => {
        if (err) return next(err);
        return res.json({ allTrips: results });
    });
};


module.exports = { getAllTrips };

