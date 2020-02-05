const connection = require('./config');

// https://alvinalexander.com/blog/post/mysql/drop-mysql-tables-in-any-order-foreign-keys

const fkcheck1 = new Promise(
	(resolve, reject) => connection.query('SET FOREIGN_KEY_CHECKS = 0;', (err) => {
		if (err) reject(err);
		console.log('SET FOREIGN_KEY_CHECKS = 0');
		resolve();
	})
);

const dropUser = new Promise(
	(resolve, reject) => connection.query('DROP TABLE user', (err) => {
		if (err) reject(err);
		console.log('User table dropped');
		resolve();
	})
);


const fkcheck2 = new Promise(
	(resolve, reject) => connection.query('SET FOREIGN_KEY_CHECKS = 1;', (err) => {
		if (err) reject(err);
		console.log('SET FOREIGN_KEY_CHECKS = 1');
		resolve();
	})
);



fkcheck1
	.then(() =>
		dropUser

			.then(() =>
				fkcheck2
					.then(() =>
						console.log('OK!')
					)
					.then(() =>
						connection.end()
					)
			)
	)
	.catch(err => {
		console.log(err);
		connection.end();
	});