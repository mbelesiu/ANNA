const { Pool } = require('pg');
const credentials = require('./config.js');

const pool = new Pool({
  host: credentials.host,
  port: credentials.port,
  database: credentials.database,
  user: credentials.user,
  password: credentials.password,
});

module.exports = pool;