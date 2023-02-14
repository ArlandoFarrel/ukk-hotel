/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

const tipeController = require('../controller/tipe_kamar_controller')

app.get("/getAllTipe", tipeController.getAllTipe)

app.post("/addTipe", tipeController.addTipe)

app.put("/:id", tipeController.updateTipe)

app.delete("/:id", tipeController.deleteTipe)
module.exports = app