const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Narapareddy@123',
    database: 'user_management'
};

const pool = mysql.createPool(config);

module.exports = pool;
