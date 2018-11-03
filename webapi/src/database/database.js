const Sequelize = require("sequelize");

const enviroment = process.env.NODE_ENV || 'dev';

const config = require('../config/config.js')[enviroment];

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);