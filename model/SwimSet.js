
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SwimSet = new Schema({
    repLength: {
        type: Number
    },
    repCount: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    labels: {
        type: Array
    }
},{
    collection: 'SwimSet'
});

module.exports = mongoose.model('SwimSet', SwimSet);
