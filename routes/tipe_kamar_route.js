/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
const { verifyToken } = require('../middleware/VerifyToken')
/** allow to read 'request' with json type */
app.use(express.json())
const {checkRole} = require('../middleware/checkRole')

const tipeController = require('../controller/tipe_kamar_controller')

app.get("/getAllTipe",verifyToken,checkRole(['admin']), tipeController.getAllTipe)

app.post("/findTipe",verifyToken, checkRole(['admin']), tipeController.findTipe)

app.post("/addTipe",verifyToken, checkRole(['admin']), tipeController.addTipe)

app.put("/:id",verifyToken,checkRole(['admin']), tipeController.updateTipe)

app.delete("/:id",verifyToken,checkRole(['admin']), tipeController.deleteTipe)
module.exports = app