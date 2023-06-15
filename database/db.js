var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Task_Manager",
    password: "$Mysql123"
})

module.exports = { conn };