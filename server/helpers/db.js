const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb @ 29625');
} );

mongoose.connection.on('error', (err) => {
    console.error('Error in database connection:' + err);
} );

module.exports = {
    User: require('../models/userModel'),
    Sensor: require('../models/sensorModel'),
};
