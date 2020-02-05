const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = connection;