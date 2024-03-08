const express = require("express");
const Car = require("../models/Car.js");
const router = express.Router();

//CREATE
router.post("/", async (req, res) => {

    const newCar = new Car(req.body)

    try {
        const savedCar = await newCar.save();
        res.status(200).json(savedCar);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {

    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {

    try {
        const updatedCar = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json("Car has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
router.get("/:id", async (req, res) => {

    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {

    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
