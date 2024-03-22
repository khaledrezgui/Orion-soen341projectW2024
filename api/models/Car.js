const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    branchId: {
        type : String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: [String], 
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    availability: [{
        start: Date,
        end: Date
    }],
    isAvailable: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Car", CarSchema);
