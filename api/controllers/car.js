
const Car = require("../models/Car.js");


const createCar = async (req,res,next)=>{
    const newCar = new Car(req.body);

    try {
        const savedCar = await newCar.save();
        res.status(200).json(savedCar);
    } catch (err) {
        next(err);
    }
}


const updateCar = async (req,res,next)=>{
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedCar);
    } catch (err) {
        next(err);
    }
}

const deleteCar = async (req,res,next)=>{
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json("Car has been deleted.");
    } catch (err) {
        next(err);
    }
}

const getCar = async (req,res,next)=>{
    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json(car);
    } catch (err) {
        next(err);
    }
}

const getCars = async (req,res,next)=>{
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        next(err);
    }
}

module.exports = { createCar, updateCar, deleteCar, getCar, getCars };