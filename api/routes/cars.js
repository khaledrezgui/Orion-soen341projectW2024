const express = require('express');
const {createCar,
    updateCar,
    deleteCar,
    getCar,
    getCars,} = require('../controllers/car.js');
const Car = require('../models/Car.js');
const router = express.Router();

//CREATE
router.post("/", createCar);

//UPDATE
router.put("/:id", updateCar);

//DELETE
router.delete("/:id", deleteCar);

//GET
router.get("/:id", getCar);

//GET ALL
router.get("/", getCars);

module.exports = router;
