
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SwimSet = new Schema({
    id: {
        type: Number,
        required: true
    },
    repLength: {
        type: Number,
        required: true
    },
    repCount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    labels: {
        type: Array,
        required: true
    }
},{
    collection: 'SwimSet'
});

module.exports = mongoose.model('SwimSet', SwimSet);
