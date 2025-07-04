const mysql = require('mysql2');
require('dotenv').config();

// Usa DB_HOST_INTERNAL si está en Docker, DB_HOST_EXTERNAL si no
const dbHost = process.env.DOCKERIZED === 'true' 
  ? process.env.DB_HOST_INTERNAL 
  : process.env.DB_HOST_EXTERNAL;

// Usa el puerto correspondiente según el host
const dbPort = process.env.DOCKERIZED === 'true'
  ? process.env.DATABASE_INTERNAL_PORT
  : process.env.DATABASE_EXTERNAL_PORT;

const pool = mysql.createPool({
  host: dbHost || process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Utalca_123',
  port: dbPort || 3306,
  database: process.env.DB_NAME || 'gps',
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0
});

module.exports = pool.promise();