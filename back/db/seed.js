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
        car_id)
    VALUES 
		('Zé', 
		'2020-02-12', 
		'14:30:00', 
		'15:30:00', 
		181654, 
		264164,
		'Rato',
		'Ikea Alfragide',
		'uau',
		1  ),
		('Maria', 
		'2020-03-12', 
		'15:30:00', 
		'16:30:00', 
		654, 
		764,
		'Rato',
		'Ikea Loures',
		'wow',
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
