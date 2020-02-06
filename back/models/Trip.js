/* eslint-disable quotes */

const connection = require('../db/config');

const Trip = {};

Trip.getAll = (cb) => {
	const q = `
	SELECT t.*, c.licence_plate FROM trip t JOIN car c ON t.car_id=c.id ORDER BY t.date DESC; 
	`;
	connection.query(q, (err, results) => {
		cb(err, results);
	});
};


module.exports = Trip;