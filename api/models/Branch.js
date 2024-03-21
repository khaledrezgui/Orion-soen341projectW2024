const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    name: String,
    address : String,
    phone: String,
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }]
});

module.exports = mongoose.model('Branch', BranchSchema);
