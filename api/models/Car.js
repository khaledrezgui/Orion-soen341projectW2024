const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    // carType:{
    //     type:String,
    //     required:true
    // },
    // transmissionType:{
    //     type:String,
    //     required:true
    // },
    // fuelType:{
    //     type:String,
    //     required:true
    // },
    description:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        
    },
    price:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    // availability:{
    //     type:Boolean,
    //     default:true
    // }

});

module.exports = mongoose.model("Cars", CarSchema);
