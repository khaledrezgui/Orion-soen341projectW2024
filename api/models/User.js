const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    creditCard: {
        name: {
            type: String,
            default: "FName LName"
        },
        number: {
            type: String,
            default: "0000000000000000"
        },
        cvv: {
            type: String,
            default:"123"
        },
        expiry: {
            type: String,
            default:"00/00"
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
