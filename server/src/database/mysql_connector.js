const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'db',
    user:'root',
    password:'123456',
    database:'my_db'
})

connection.connect( err => {
    if (err) throw err;
})

module.exports = connection
