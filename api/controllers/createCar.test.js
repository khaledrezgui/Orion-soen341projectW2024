const { createCar } = require('./car');
const Car = require('../models/Car');

// Mock the Car model
jest.mock('../models/Car', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        id: '123',
        make: 'Test Make',
        model: 'Test Model',
        year: 2021
      })
    };
  });
});

describe('createCar', () => {
  it('should create a new car and return it', async () => {
    const req = {
      body: {
        make: 'Test Make',
        model: 'Test Model',
        year: 2021
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await createCar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: '123',
      make: 'Test Make',
      model: 'Test Model',
      year: 2021
    });
  });
});
