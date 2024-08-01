const express = require('express')
const mongoose = require('mongoose')
const mongoStore = require("connect-mongo")
const bodyParser = require('body-parser')
const fs = require("fs");
const session = require("express-session")
const cors = require('cors')
const app = express()
const port = 3000

const mongoUri = "mongodb://localhost:27017/SwimSetPlanner"

app.use(bodyParser.json());
app.use(cors())

app.use(session({
    secret: fs.readFileSync("./session-secret"),
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: mongoUri
    }),
  }))

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const swimSetRoute = require('./routes/SwimSet.route');
const scheduledSetRoute = require('./routes/ScheduledSet.route')
app.use('/swimsets', swimSetRoute);
app.use('/setschedule', scheduledSetRoute)

if (fs.existsSync('./swim-planner-frontend')) {
    app.use('/', express.static('swim-planner-frontend/browser'))
    console.log("Serving frontend from static content.")
} else {
    console.warn("Frontend folder not found and will not be served.")
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})