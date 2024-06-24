const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/SwimSetPlanner").then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const swimSetRoute = require('./routes/SwimSet.route');
app.use('/swimsets', swimSetRoute);
app.get('/', (request, response) => {
    response.send(
        "Endpoint roster:<br/>" + 
        "/swimsets : Get swim sets<br/>" + 
        "/scheduledsets : Dates on which swim sets were swam."
    )
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})