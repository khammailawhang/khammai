// Knex JS Framework

var connect = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'P@$$w0rd',
        database: 'khammai'
    }
})
module.exports = connect;