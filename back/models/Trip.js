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
					trip.observations,
					+trip.is_finished,
					+trip.car_id,
				],
				(err, results, fields) => {
					callback(err, results, fields);
	  },
	);
  };

  Trip.edit = (trip, callback) => {
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
		trip.observations,
		+trip.is_finished,
		+trip.car_id,
		+trip.id
	  ],
	  (err, results, fields) => {
		callback(err, results, fields);
	  },
	);
  };
  
  Trip.delete = (trip, callback) => {
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