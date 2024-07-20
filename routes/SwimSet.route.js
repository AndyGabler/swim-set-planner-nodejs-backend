const express = require('express');
const app = express();
const swimSetRoutes = express.Router();

let SwimSet = require("../model/SwimSet")

// GET route for all swim sets
swimSetRoutes.route('/').get(function (request, response) {
    SwimSet.find(request.query)
        .then(results => {
            response.status(200).json(results)
        })
        .catch(error => {
            console.error("Failed to lookup swim sets.", error)
            response.status(500).json({"message": "Internal server error."})
        });
});

// POST route for updates and insertions
swimSetRoutes.route('/').post(function (request, response) {
    let inputSwimSet = new SwimSet(request.body)
    if (inputSwimSet.id && inputSwimSet.id <= 0) {
        response.status(400).json({ "message" : "id must be positive" })
        return
    }
    SwimSet.findOne({ 'id': inputSwimSet.id })
        .then(existingSet => {
            let updateSet = existingSet
            term = "update"
            if (!updateSet) {
                updateSet = inputSwimSet
                term = "create"
            }
            updateSet.name = inputSwimSet.name || updateSet.name
            updateSet.repLength = inputSwimSet.repLength || updateSet.repLength
            updateSet.repCount = inputSwimSet.repCount || updateSet.repCount
            updateSet.description = inputSwimSet.description || updateSet.description
            updateSet.labels = inputSwimSet.labels || updateSet.labels

            updateSet.save()
                .then(result => {
                    console.log("Successfully performed " + term + " for swim set with ID " + result.id)
                    response.status(200).json({
                        "message": term + " performed successfully",
                        "swimSet": result
                    })
                })
                .catch(error => {
                    console.error("Set " + term + " failed", error)
                    response.status(500).json({ "message": "Internal server error blocked " + term })
                })
        })
        .catch(error => {
            console.error("Lookup for existing set failed.", error)
            response.status(500).json({ "message": "Internal server error." })
        })
});

module.exports = swimSetRoutes;