const Reservation = require('../models/Reservation');
const Car = require('../models/Car');




// const createReservation = async (req, res) => {
//  try {
//     const reservation = new Reservation(req.body);
//     await reservation.save();
//     res.status(201).send(reservation);
//  } catch (error) {
//     res.status(400).send(error);
//  }
// };
async function checkOverlappingReservations(carId, startDate, endDate) {
    const overlappingReservations = await Reservation.find({
        car: carId,
        $or: [
            { startDate: { $lte: endDate, $gte: startDate } },
            { endDate: { $lte: endDate, $gte: startDate } },
            { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
        ]
    });
    return overlappingReservations.length > 0;
}

async function updateCarAvailability(carId, startDate, endDate) {
    const car = await Car.findById(carId);
    if (!car.availability) {
        car.availability = [];
    }
    car.availability.push({ start: startDate, end: endDate });
    await car.save();
}

const createReservation = async (req, res) => {
    try {
        const { user, car, startDate, endDate } = req.body;
        const isOverlapping = await checkOverlappingReservations(car, startDate, endDate);
        if (isOverlapping) {
            return res.status(400).send('Car is already reserved for the requested period.');
        }
        const reservation = new Reservation({ user: user, car: car, startDate, endDate });
        await reservation.save();
        await updateCarAvailability(car, startDate, endDate);
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateReservation = async (req, res) => {
 try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
 } catch (error) {
    res.status(400).send(error);
 }
};

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
const getReservations = async (req, res) => {
    try {
       const reservations = await Reservation.find({});
       res.send(reservations);
    } catch (error) {
       res.status(500).send(error);
    }
   };


  

module.exports = { createReservation, updateReservation, deleteReservation, getReservation, getReservations, };