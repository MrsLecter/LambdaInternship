const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'crypto',
    password: '5Mu7kx98up9+'
});

module.exports = pool.promise();