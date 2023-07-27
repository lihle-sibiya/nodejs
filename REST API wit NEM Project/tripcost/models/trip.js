const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    name: String,
});

const trip = mongoose.model('trip', tripSchema);// Create a Mongoose model for the trip collection

module.exports = trip;

