require('dotenv').config();
const {Client} = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function connectToDatabase() {
    client.connect(undefined)
        .then(() => console.log('Conectado a la base de datos PostgreSQL con éxito'))
        .catch(e => console.log(e));
}

module.exports = {
    client,
    connectToDatabase
}