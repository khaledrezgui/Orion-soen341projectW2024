const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true 
    },
    address: {
        type: String,
        required: true, 
        trim: true 
    },
    phone: {
        type: String,
        required: true, 
        trim: true
    },
    location: { 
        lat: { // Latitude
            type: Number,
            required: true
        },
        lng: { // Longitude
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('Branch', BranchSchema);
