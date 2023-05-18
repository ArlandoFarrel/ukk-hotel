import {Sequelize} from "sequelize";

const db = new Sequelize('hotel', 'root', '', {
  host: "localhost",
  dialect: "mysql"
})

export default db;