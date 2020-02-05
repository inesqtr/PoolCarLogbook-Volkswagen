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

Trip.create = (trip, callback) => {
	
	connection.query(
		`INSERT INTO trip (
			driver, 
			date, 
			time_start, 
			time_finish, 
			kms_start, 
			kms_finish,
			location_start,
			location_destination,
			observations,
			is_finished,
			car_id
			)
			VALUES 
			(
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?
				)`,
				[
					trip.driver,
					trip.date,
					trip.time_start,
					trip.time_finish,
					+trip.kms_start,
					+trip.kms_finish,
					trip.location_start,
					trip.location_destination,
					observations,
					+is_finished,
					+car_id,
				],
				(err, results, fields) => {
					console.log('hey from model', err)	
					callback(err, results, fields);
	  },
	);
  };

  Trip.edit = (doc, callback) => {
	connection.query(
	  `UPDATE trip 
	  SET 		
	  driver =?, 
	  date =?, 
	  time_start =?, 
	  time_finish =?, 
	  kms_start =?, 
	  kms_finish =?,
	  location_start =?,
	  location_destination =?,
	  observations =?,
	  is_finished =?,
	  car_id =?
	  WHERE id = ?`,
	  [
		trip.driver,
		trip.date,
		trip.time_start,
		trip.time_finish,
		+trip.kms_start,
		+trip.kms_finish,
		trip.location_start,
		trip.location_destination,
		observations,
		+is_finished,
		+car_id,
	  ],
	  (err, results, fields) => {
		callback(err, results, fields);
	  },
	);
  };
  
  Trip.delete = (doc, callback) => {
	connection.query(
	  `DELETE FROM trip 
	   WHERE id = ?`,
	  [
		+trip.id,
	  ],
	  (err, results, fields) => {
		callback(err, results, fields);
	  },
	);
  };
  
module.exports = Trip;