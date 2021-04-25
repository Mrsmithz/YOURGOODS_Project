const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:'db',
    user:'root',
    password:'123456',
    database:'mysql_db',
    waitForConnections:true,
    connectionLimit:90,
    queueLimit:0
})

module.exports = pool
