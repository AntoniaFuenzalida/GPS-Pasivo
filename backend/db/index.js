const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '35.226.52.251',
  user: 'admin',
  password: 'admin',
  port: 3306,
  database: 'gps',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();