const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '34.67.77.73',
  user: 'admin',
  password: 'Utalca_123',
  port: 3306,
  database: 'gps',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();