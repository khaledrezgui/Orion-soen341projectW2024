const { createReservation } = require('./controllers/reservation');

// Corrected mock setup based on provided files
jest.mock('./models/Reservation', () => ({
    exists: jest.fn(),
    create: jest.fn()
  }));
  jest.mock('../api/controllers/Car', () => ({
    findById: jest.fn()
  }));
  
  describe('Reservation Controller - createReservation', () => {
    it('should successfully create a reservation if no overlapping exists', async () => {
      const mockCar = { _id: 'car123'};
      const mockReservationData = {
        user: 'user123',
        car: 'car123',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-10')
      };
  
      Car.findById.mockResolvedValue(mockCar);
      Reservation.exists.mockResolvedValue(false);
      Reservation.create.mockResolvedValue({
        ...mockReservationData,
        _id: 'reservation123'
      });
  
      const req = { body: mockReservationData };
      const res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
  
      await createReservation(req, res, next);
  
      expect(Reservation.exists).toHaveBeenCalled();
      expect(Reservation.create).toHaveBeenCalledWith(mockReservationData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });
  });
  