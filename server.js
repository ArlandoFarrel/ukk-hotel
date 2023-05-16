/** load library express */
const express = require(`express`)
/** create object that instances of express */
const app = express()
/** define port of server */
const PORT = 8000

const bodyParser = require('body-parser')


// penggunaan body-parser untuk ekstrak data request berformas JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))
/** load library cors */
const cors = require(`cors`)
/** open CORS policy */
app.use(cors())
/** define all routes */
const userRoute = require(`./routes/user_route`)
/** define prefix for each route */
app.use(`/user`, userRoute)
app.use(express.static(__dirname))


const tipeRoute = require(`./routes/tipe_kamar_route`)
/** define prefix for each route */
app.use(`/tipe`, tipeRoute)
app.use(express.static(__dirname))


const kamarRoute = require(`./routes/kamar_route`)
/** define prefix for each route */
app.use(`/kamar`, kamarRoute)
app.use(express.static(__dirname))

const pesanRoute = require(`./routes/pemesanan_route`)
/** define prefix for each route */
app.use(`/pemesanan`, pesanRoute)
app.use(express.static(__dirname))

const authRoute = require('./routes/auth_route');
app.use('/auth', authRoute);
app.use(express.static(__dirname))





/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of Hotel runs on port
    ${PORT}`)
    })

