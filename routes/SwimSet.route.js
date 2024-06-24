const express = require('express');
const app = express();
const swimSetRoutes = express.Router();

let SwimSet = require("../model/SwimSet")

swimSetRoutes.route('/').get(function (request, response) {
    SwimSet.find(function (error, swimSets) {
        if (error) {
            response.status(500).send({'status': 'failure','mssg': 'Internal server error.'});
        } else {
            response.status(200).json({'status': 'success','users': swimSets});
        }
    });
});

module.exports = swimSetRoutes;