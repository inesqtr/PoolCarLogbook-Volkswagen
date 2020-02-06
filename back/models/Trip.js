/* eslint-disable quotes */

const connection = require('../db/config');

const Trip = {};


Trip.getAllTrips = (cb) => {
	const q = `
	SELECT t.*, c.licence_plate FROM trip t JOIN car c ON t.car_id=c.id; 
	`;
	connection.query(q, (err, results) => {
		cb(err, results);
	});
};



module.exports = Trip;