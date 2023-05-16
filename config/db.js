const Sequelize = require('sequelize');

const sequelize = new Sequelize('hotel', 'email', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
