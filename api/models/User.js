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
            required: true
        },
        number: {
            type: String,
            required: true
        },
        cvv: {
            type: String,
            required: true
        },
        expiry: {
            type: String,
            required: true
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
