/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
const { verifyToken } = require('../middleware/VerifyToken')
/** allow to read 'request' with json type */
app.use(express.json())

const userController = require('../controller/user_controller')

app.get("/getAllUser", userController.getAllUser)

app.post("/findUser", userController.findUser)

app.post("/findUserEmail", userController.findUserEmail)

app.post("/addUser", userController.addUser)

app.put("/:id", userController.updateUser)

app.delete("/:id", userController.deleteUser)
module.exports = app