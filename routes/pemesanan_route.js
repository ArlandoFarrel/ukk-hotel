/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

const pesanController = require('../controller/pemesanan_controller')

app.get("/getAllPemesanan", pesanController.getAllPemesanan)

app.post("/addPemesanan", pesanController.addPemesanan)

app.post("/findPemesanan/:id", pesanController.findPemesanan)

app.put("/:id", pesanController.updatePemesanan)

app.delete("/:id", pesanController.deletePemesanan)
module.exports = app