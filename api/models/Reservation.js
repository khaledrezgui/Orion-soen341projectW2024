const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    gps: {
        type: Boolean,
        required: true
    },
    safetySeat: {
        type: Boolean,
        required: true
    },
    fuelService:{
        type:Boolean,
        required:true
    },
    insurance: {
        type: Boolean,
        required: true
    }
    
});

module.exports = mongoose.model('Reservation', ReservationSchema);
