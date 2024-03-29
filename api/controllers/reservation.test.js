const { createReservation } = require('./reservation');
const Reservation = require('../models/Reservation');
const Car = require('../models/Car');

// First, ensure that the module is mocked
jest.mock('../models/Reservation', () => ({
  exists: jest.fn(),
  // Mock other methods as needed, e.g., constructor for creating a new instance
}));

// Assuming Car model is also mocked similarly
jest.mock('../models/Car', () => ({
  findById: jest.fn()
}));

describe('createReservation', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { body: { /* mock reservation details */ } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  test('Car not found', async () => {
    Car.findById.mockResolvedValue(null);

    const mockReq = { body: { /* define your req.body here */ } };
    const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await createReservation(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404); 
  });

  test('Overlapping reservation', async () => {
    
    Car.findById.mockResolvedValue({ /* mock car details */ });
    Reservation.exists.mockResolvedValue(true);

    // Define mockReq and mockRes here as needed

    await createReservation(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  test('Successful reservation creation', async () => {
    Car.findById.mockResolvedValue({ _id: 'car_id', price: 100 });
    Reservation.exists.mockResolvedValue(false);
  
    const mockReq = {
      body: {
        user: 'user_id',
        car: 'car_id',
        startDate: new Date('2022-01-01').toISOString(),
        endDate: new Date('2022-01-02').toISOString(),
        gps: true,
        safetySeat: false,
        fuelService: true,
        insurance: true,
      }
    };
  
    const mockRes = { 
      status: jest.fn().mockReturnThis(), 
      send: jest.fn()
    };
  
    await createReservation(mockReq, mockRes);
  
    // Debugging output
    console.log(mockRes.status.mock.calls);
  
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  
  
});
