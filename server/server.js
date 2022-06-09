const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const jwt = require('./app/_helpers/jwt')

const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(fileUpload())

require('./app/routes/user.routes.js')(app)
require('./app/routes/restaurant.routes')(app)
require('./app/routes/review.routes')(app)
require('./app/routes/reply.routes')(app)
// set port, listen for requests
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
