const { Sequelize } = require('sequelize');
const config = require("../config.json");
module.exports = new Sequelize(config.DB, config.User, config.Senha, {
    host: config.Host,
    dialect: 'mysql',
    logging: false
});