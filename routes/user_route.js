/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
const { verifyToken } = require('../middleware/VerifyToken')
/** allow to read 'request' with json type */
app.use(express.json())
const {checkRole} = require('../middleware/checkRole')
const userController = require('../controller/user_controller')

app.get("/getAllUser",verifyToken,checkRole(['admin']), userController.getAllUser)

app.post("/findUser",verifyToken,checkRole(['admin']), userController.findUser)

app.post("/findUserEmail", userController.findUserEmail)

app.post("/addUser",userController.addUser)

app.put("/:id", verifyToken,checkRole(['admin']), userController.updateUser)

app.delete("/:id",verifyToken,checkRole(['admin']),userController.deleteUser)
module.exports = app