require('dotenv').config();
const { dbPool } = require('../src/database/database');
const migration = require('mysql-migrations');

migration.init(dbPool, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});