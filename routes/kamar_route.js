/** load library express */
const express = require(`express`)
const { verifyToken } = require('../middleware/VerifyToken')
/** initiate object that instance of express */
const app = express()
const {checkRole} = require('../middleware/checkRole')
/** allow to read 'request' with json type */
app.use(express.json())

const kamarController = require('../controller/kamar_controller')

app.get("/getAllKamar",verifyToken,checkRole(['admin']), kamarController.getAllKamar)

app.post("/findKamar",verifyToken,checkRole(['admin','resepsionis']), kamarController.findKamar)

app.post("/addKamar",verifyToken,checkRole(['admin']), kamarController.addKamar)

app.post("/getKamarAvaible", kamarController.getKamarAvaible)

app.put("/:id", kamarController.updateKamar)

app.delete("/:id",verifyToken,checkRole(['admin']), kamarController.deleteKamar)
module.exports = app