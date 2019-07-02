const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    timestamp: { type: Number, required: true },
    description: {type: String},
    sensor: {type: String, required: true},
    location: {type: String},
    value: {type: Number},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Sensor', schema);
