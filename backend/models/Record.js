
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    location: String,
    date: String,
    time: String,
    samples: [Number],
    average: Number,
    deviation: Boolean,
    deviationReason: String,
    correctiveAction: String,
    comments: String,
    auditTrail: [{
        timestamp: Date,
        changes: String
    }]
});

module.exports = mongoose.model('Record', recordSchema);
