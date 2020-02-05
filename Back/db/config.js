const  mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = connection;