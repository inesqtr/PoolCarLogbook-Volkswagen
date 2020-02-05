/* eslint-disable quotes */

const connection = require('../db/config');

const Trip = {};


Trip.getAllTrips = (cb) => {
	const q = `
	SELECT * FROM trip
	`;
	connection.query(q, (err, results) => {
		cb(err, results);
	});
};



module.exports = Trip;