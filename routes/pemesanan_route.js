/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
const { verifyToken } = require('../middleware/VerifyToken')
/** allow to read 'request' with json type */
app.use(express.json())
const {checkRole} = require('../middleware/checkRole')

const pesanController = require('../controller/pemesanan_controller')

app.get("/getAllPemesanan",verifyToken, checkRole(['resepsionis']) ,pesanController.getAllPemesanan)

app.post("/addPemesanan",verifyToken,checkRole(['customer','resepsionis']),pesanController.addPemesanan)

app.put("/updateStatusPemesanan/:id",verifyToken, pesanController.updateStatusPemesanan);

app.get("/getPesanId/:id", verifyToken, checkRole(['customer']), pesanController.getPemesananById);


app.post("/findPemesanan/:id",verifyToken,checkRole(['customer','resepsionis']), pesanController.findPemesanan)

app.put("/:id",verifyToken,checkRole(['resepsionis']), pesanController.updatePemesanan)

app.delete("/:id",verifyToken,checkRole(['resepsionis']), pesanController.deletePemesanan)
module.exports = app