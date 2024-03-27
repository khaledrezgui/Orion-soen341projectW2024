const Reservation = require('../models/Reservation');
const Car = require('../models/Car');

async function checkOverlappingReservations(carId, startDate, endDate) {
    return await Reservation.exists({
        car: carId,
        $or: [
            { startDate: { $lte: endDate, $gte: startDate } },
            { endDate: { $lte: endDate, $gte: startDate } },
            { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
        ]
    });
}

// CREATE
const createReservation = async (req, res) => {
    const { user, car, startDate, endDate, gps, safetySeat, fuelService, insurance } = req.body;

    const carDetails = await Car.findById(car);
    if (!carDetails) {
        return res.status(404).send({ message: 'Car not found.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    const totalPrice = durationInHours * carDetails.price; 

    try {
        if (await checkOverlappingReservations(car, startDate, endDate)) {
            return res.status(400).send('Car is already reserved for the requested period.');
        }

        const reservation = new Reservation({
            user,
            car,
            startDate,
            endDate,
            gps,
            safetySeat,
            fuelService,
            insurance,
            totalPrice 
        });

        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
};


// UPDATE
const updateReservation = async (req, res) => {
    try {
        const reservationToUpdate = await Reservation.findById(req.params.id);
        if (!reservationToUpdate) {
            return res.status(404).send({ message: 'Reservation not found.' });
        }

        // Check if the car details are needed to be fetched
        const carDetails = await Car.findById(reservationToUpdate.car);
        if (!carDetails) {
            return res.status(404).send({ message: 'Car not found.' });
        }

        // Determine if the start and end dates are being updated
        const startDate = req.body.startDate ? new Date(req.body.startDate) : reservationToUpdate.startDate;
        const endDate = req.body.endDate ? new Date(req.body.endDate) : reservationToUpdate.endDate;

        // Calculate the new total price if either date has changed
        if (req.body.startDate || req.body.endDate) {
            const durationInHours = (endDate - startDate) / (1000 * 60 * 60);
            req.body.totalPrice = durationInHours * carDetails.price; 
        }

        // Update the reservation with the potentially new dates and recalculated total price
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).send(error);
    }
};


// DELETE
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET
const getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET ALL
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createReservation, updateReservation, deleteReservation, getReservation, getReservations };
