const mysql = require('mysql2');
require('dotenv').config();


  const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});


pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error al conectar con MySQL:', error);
    return;
  }
  console.log('Conexión exitosa con MySQL');
  connection.release();
});

module.exports = pool;