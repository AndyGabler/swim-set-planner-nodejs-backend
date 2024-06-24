const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

const swimSetRoute = require('./routes/SwimSet.route');
app.use('/swimsets', swimSetRoute);
app.get('/', (request, response) => {
    response.send(
        'Endpoint roster:<br/>' + 
        "/swimsets : Get swim sets<br/>" + 
        "/scheduledsets : Dates on which swim sets were swam."
    )
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})