const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;
const db = pgp(connectionString);

module.exports = db;
