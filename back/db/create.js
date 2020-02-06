const connection = require('./config');

const Car = `
    CREATE TABLE IF NOT EXISTS car (
        id INT NOT NULL AUTO_INCREMENT,
        licence_plate VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
`;

const Trip = `
  CREATE TABLE IF NOT EXISTS trip (
    id INT NOT NULL AUTO_INCREMENT,
    driver VARCHAR(225) NOT NULL,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_finish TIME NOT NULL,
    kms_start INT,
    kms_finish INT,
    location_start VARCHAR(225) NOT NULL,
    location_destination VARCHAR(225) NOT NULL,
    observations VARCHAR(225) NULL,
    is_finished BOOL NOT NULL DEFAULT 0,
    car_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (car_id)
    REFERENCES car (id)
    )
`;

connection.query(Car, (err) => {
    if (err) {
        console.log(err);
        connection.end();
    } else {
        console.log('car created');
        connection.query(Trip, (err) => {
            if (err) {
                console.log(err);
                connection.end();
            } else {
                console.log('trip created');
                connection.end();
            }
        }
        )
    }
})

