const mongoose = require('mongoose');
const SwimSet = require('./SwimSet');
const Schema = mongoose.Schema;

let ScheduledSet = new Schema({
    id: {
        type: Number,
        required: true
    },
    dateScheduled: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    scheduledSet: {
        type: Object,
        required: true
    }
},{
    collection: 'ScheduledSet'
})

module.exports = mongoose.model('ScheduledSet', ScheduledSet);
