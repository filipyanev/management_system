const Sequelize = require("sequelize");
require("dotenv").config();

/**
 * Connection string in .env file in the following format
 * Example: postgres://user:password@localhost:5432/dbname
 */
module.exports = new Sequelize(process.env.PG_DB_CONNECTION_STRING, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});