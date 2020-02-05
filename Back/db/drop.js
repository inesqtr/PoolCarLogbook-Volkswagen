const connection = require('./config');

// https://alvinalexander.com/blog/post/mysql/drop-mysql-tables-in-any-order-foreign-keys

connection.query(`DROP TABLE trip`, (err) => {
	if (err) {
		console.log(err);
		connection.end();
	} else {
		console.log('trip  table deleted');
		connection.query(`DROP TABLE car`, (err) => {
			if (err) {
				console.log(err);
				connection.end();
			} else {
				console.log('car table deleted');
				connection.end();
			}
		}
		)
	}
})


