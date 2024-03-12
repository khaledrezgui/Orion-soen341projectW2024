const express = require('express');

const { createReservation,
    updateReservation,
    deleteReservation,
    getReservation,
    getReservations, } = require('../controllers/reservation.js');
const Reservation = require('../models/Reservation.js');
const router = express.Router();

//CREATE
router.post("/", createReservation);

//UPDATE
router.put("/:id", updateReservation);

//DELETE
router.delete("/:id", deleteReservation);

//GET
router.get("/:id", getReservation);

//GET ALL
router.get("/", getReservations);

module.exports = router;