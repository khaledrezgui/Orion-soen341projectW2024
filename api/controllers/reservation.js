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
    const { user, car, startDate, endDate, gps, safetySeat, fuelService, insurance, sharedUsers, isShared } = req.body;

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
            totalPrice, // Include total price calculation with additional services
            isShared,
            sharedUsers
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
        const { startDate, endDate, gps, safetySeat, fuelService, insurance, sharedUsers } = req.body;

        const reservationToUpdate = await Reservation.findById(req.params.id).populate('car');
        if (!reservationToUpdate) {
            return res.status(404).send({ message: 'Reservation not found.' });
        }

        // Update fields if they exist in req.body
        if (startDate) reservationToUpdate.startDate = new Date(startDate);
        if (endDate) reservationToUpdate.endDate = new Date(endDate);
        if (gps !== undefined) reservationToUpdate.gps = gps;
        if (safetySeat !== undefined) reservationToUpdate.safetySeat = safetySeat;
        if (fuelService !== undefined) reservationToUpdate.fuelService = fuelService;
        if (insurance !== undefined) reservationToUpdate.insurance = insurance;

        // Update sharedUsers directly without mapping to ObjectId,
        // assuming sharedUsers is already provided as an array of ObjectId strings from the client.
        if (sharedUsers !== undefined) {
            reservationToUpdate.sharedUsers = sharedUsers;
            reservationToUpdate.isShared = sharedUsers.length > 0;
        }

        // Recalculate the total price based on possibly updated values
        const durationInHours = (reservationToUpdate.endDate - reservationToUpdate.startDate) / (1000 * 60 * 60);
        const additionalServicesPrice = (gps ? 1 : 0) + (safetySeat ? 1 : 0) + (fuelService ? 1 : 0) + (insurance ? 1 : 0) * 50;
        reservationToUpdate.totalPrice = durationInHours * reservationToUpdate.car.price + additionalServicesPrice;

        await reservationToUpdate.save();
        res.status(200).json(reservationToUpdate);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(400).send({ message: 'Error updating reservation', error: error.message });
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
