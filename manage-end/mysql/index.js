const  mysql = require("mysql");
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'li7758521',
    database: 'manage'
});

module.exports = db;