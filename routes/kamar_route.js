/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

const kamarController = require('../controller/kamar_controller')

app.get("/getAllKamar", kamarController.getAllKamar)

app.post("/findKamar", kamarController.findKamar)

app.post("/addKamar", kamarController.addKamar)

app.put("/:id", kamarController.updateKamar)

app.delete("/:id", kamarController.deleteKamar)
module.exports = app