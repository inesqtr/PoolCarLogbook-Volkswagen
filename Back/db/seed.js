const connection = require('./config');

const insertUser = new Promise(
	(resolve, reject) => connection.query(`INSERT INTO user (username, passwordHash) VALUES (
        'admin', SHA2('loudness',256)
    )`, (err) => {
		if (err) reject(err);
		console.log('User inserted');
		resolve();
	})
);


insertUser
	.then(() =>
		insertTeam

			.then(() =>
				console.log('OK!')
			)
			.then(() =>
				connection.end()
			)
	)
	.catch(err => {
		console.log(err);
		connection.end();
	});