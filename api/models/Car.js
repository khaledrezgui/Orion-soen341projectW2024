const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    branchId: {
        type: String,
        default: "6603983fe8160304628dd514"
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
    }
});

module.exports = mongoose.model("Car", CarSchema);
