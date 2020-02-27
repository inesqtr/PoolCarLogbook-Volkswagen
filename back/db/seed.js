const connection = require('./config');

const insertCar =
	`
    INSERT INTO car (licence_plate)
	VALUES ('72-VZ-96'), ('15-IP-13'), ('06-OH-29')`;

const insertTrip = `INSERT INTO trip 
    (driver, 
		date, 
		time_start, 
		time_finish, 
		kms_start, 
		kms_finish,
		location_start,
		location_destination,
		observations,
		is_finished,
      car_id)
    VALUES 
		('José Maria', 
		'2020-02-12', 
		'14:30:00', 
		'15:30:00', 
		181654, 
		264164,
		'Rato',
		'Ikea Alfragide',
		'Buy new desks',
		false,
		1 ),
		('Maria José', 
		'2020-03-12', 
		'15:30:00', 
		'16:30:00', 
		654, 
		764,
		'Rato',
		'Ikea Loures',
		'Retrieve the chair purchased online',
		true,
		2  )`;

connection.query(insertCar, (err) => {
	if (err) {
		console.log(err);
		connection.end();
	} else {
		console.log('car table seeded');
		connection.query(insertTrip, (err) => {
			if (err) {
				console.log(err);
				connection.end();
			} else {
				console.log('trip table seeded');
				connection.end();
			}
		}
		)
	}
})
