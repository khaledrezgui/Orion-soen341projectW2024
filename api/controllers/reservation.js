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

    // Calculate additional charges based on selected features
    const additionalServicesPrice = (gps + safetySeat + fuelService + insurance) * 50;
    const totalPrice = durationInHours * carDetails.price + additionalServicesPrice; 

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
            totalPrice // Include total price calculation with additional services
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

        const carDetails = await Car.findById(reservationToUpdate.car);
        if (!carDetails) {
            return res.status(404).send({ message: 'Car not found.' });
        }

        const startDate = req.body.startDate ? new Date(req.body.startDate) : reservationToUpdate.startDate;
        const endDate = req.body.endDate ? new Date(req.body.endDate) : reservationToUpdate.endDate;
        const durationInHours = (endDate - startDate) / (1000 * 60 * 60);

        // Include logic to determine which additional services are selected
        const gps = req.body.gps !== undefined ? req.body.gps : reservationToUpdate.gps;
        const safetySeat = req.body.safetySeat !== undefined ? req.body.safetySeat : reservationToUpdate.safetySeat;
        const fuelService = req.body.fuelService !== undefined ? req.body.fuelService : reservationToUpdate.fuelService;
        const insurance = req.body.insurance !== undefined ? req.body.insurance : reservationToUpdate.insurance;

        // Calculate additional charges based on selected features
        const additionalServicesPrice = (gps + safetySeat + fuelService + insurance) * 50;
        const totalPrice = durationInHours * carDetails.price + additionalServicesPrice;

        // Update the reservation with new details and recalculated total price
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { ...req.body, totalPrice }, { new: true });

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
