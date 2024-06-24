const express = require('express');
const app = express();
const swimSetRoutes = express.Router();

let SwimSet = require("../model/SwimSet")

swimSetRoutes.route('/').get(function (request, response) {
    SwimSet.find()
        .then((results) => {
            response.status(200).json(results)
        })
        .catch((error) => {
            console.error("Failed to lookup swim sets.", error)
            response.status(500).json({"message": "Internal server error."})
        });
});

module.exports = swimSetRoutes;