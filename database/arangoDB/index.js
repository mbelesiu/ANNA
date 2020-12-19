const Arango = require('arangojs').Database;
const { username, password, database } = require('./config.js');

const arangoURI = 'http://127.0.0.1:8529';
const db = new Arango(arangoURI);
db.useDatabase(database);
db.useBasicAuth(username, password);

module.exports = db;