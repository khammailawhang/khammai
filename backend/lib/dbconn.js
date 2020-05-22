// Knex JS Framework

const mysqli = require('mysql');
const connection = mysqli.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@$$w0rd',
    database: 'khammai'
});
connection.connect();
module.exports = connection;