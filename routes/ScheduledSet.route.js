const express = require('express');
const app = express();
const scheduledSetRoutes = express.Router();
const joi = require('joi')

let ScheduledSet = require('../model/ScheduledSet')
let SwimSet = require("../model/SwimSet")

scheduledSetRoutes.route('/').get(function (request, response) {
    ScheduledSet.find(request.query)
        .then(results => {
            response.status(200).json(results)
        })
        .catch(error => {
            console.error("Failed to lookup set schedule.", error)
            response.status(500).json({"message": "Internal server error."})
        });
});

/*
 * This route is to find the Max ID. This is likely not the proper way to secure a new ID, which of itself is
 * probably a result of my Relational database mindset vs MongoDB which is a Document database
 */
scheduledSetRoutes.route('/maxId').get(function (request, response) {
    ScheduledSet
        .aggregate([
            {
                $group : {
                    _id: null,
                    maxId: { $max: "$id"}
                }
            }
        ])
        .then(result => {
            console.log("MaxID is", result[0].maxId)
            response.status(200).json({"maxId" : result[0].maxId })
        })
        .catch(error => {
            console.error("Failed to look up the Maximum Scheduled Set ID.", error)
            response.status(500).json({"message": "Internal server error."})
        });
});

const newSetValidation = joi.object({
    /*
     * TODO technically, I should change this so if I'm setting ID to max ID, the backend assigns ID.
     * Inviting the frontend to determine an ID only used in the backend seems silly.
     */ 
    id: joi.number().required(true),
    dateScheduled: joi.string().length(10).pattern(/\d{4}\-\d{2}\-\d{2}/),
    order: joi.number(),
    scheduledSetId: joi.number()
})

scheduledSetRoutes.route('/').post(function (request, response) {
    const { validationResult } = newSetValidation.validate(request.body);
    
    if (validationResult) {
        response.status(400).json({"message": validationResult.message})
        return
    }

    ScheduledSet.findOne({ "id" : request.body.id })
        .then(existingSet => {
            
            let updateSet = existingSet;
            term = "update"
            if (!updateSet) {
                updateSet = new ScheduledSet()
                term = "create"
            }

            let scheduledSetId = request.body.scheduledSetId
            if (!scheduledSetId) {
                scheduledSetId = -1
            }

            SwimSet.findOne({ "id" : scheduledSetId })
                .then(scheduledSet => {
                    updateSet.id = request.body.id
                    updateSet.dateScheduled = request.body.dateScheduled || updateSet.dateScheduled
                    updateSet.order = request.body.order || updateSet.order
                    updateSet.scheduledSet = scheduledSet || updateSet.scheduledSet

                    updateSet.save()
                        .then(result => {
                            console.log("Successfully performed " + term + " for scheduled set with ID " + result.id)
                            response.status(200).json({
                                "message": term + " performed successfully",
                                "scheduledSet": result
                            })
                        })
                        .catch(error => {
                            console.error("Scheduled Set " + term + " failed", error)
                            response.status(500).json({ "message": "Internal server error blocked " + term })
                        })
                })
                .catch(error => {
                    console.error("Failed to look up a Swim Set for Scheduled Set.", error)
                    response.status(500).json({ "message": "Internal server error." })
                })
        })
        .catch(error => {
            console.error("Lookup for existing scheduled set failed.", error)
            response.status(500).json({ "message": "Internal server error." })
        })
});

module.exports = scheduledSetRoutes;