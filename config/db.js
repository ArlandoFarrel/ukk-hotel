import {Sequelize} from "sequelize";

const db = new Sequelize('hotell', 'root', '', {
  host: "localhost",
  dialect: "mysql"
})

export default db;