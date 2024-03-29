const { createBranch, getBranch, getBranches } = require('./branch'); // Adjust the path as necessary
const Branch = require('../models/Branch'); // Adjust the path as necessary

// Define mock data before using it
const mockBranch = {
  name: 'Test Branch',
  address: '123 Test Ave',
  phone: '1234567890',
  location: { lat: 10, lng: 20 },
};


// Mocking the static methods of the Branch model
Branch.save = jest.fn().mockResolvedValue(mockBranch);
Branch.findById = jest.fn().mockResolvedValue(mockBranch);
Branch.find = jest.fn().mockResolvedValue([mockBranch]);

describe('Branch Controller', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    Branch.save.mockClear();
    Branch.findById.mockClear();
    Branch.find.mockClear();
  });

  test('createBranch creates a branch successfully', async () => {
    const req = { body: mockBranch };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await createBranch(req, res, next);

    // expect(res.status).toHaveBeenCalledWith(0);
    expect(res.json).toHaveBeenCalledWith(mockBranch);
  }, 15000); // Timeout increased to 10000 ms

  test('getBranch retrieves a branch successfully', async () => {
    const req = { params: { id: 'someId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await getBranch(req, res, next);

    expect(Branch.findById).toHaveBeenCalledWith('someId');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBranch);
  });

  test('getBranches retrieves all branches successfully', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await getBranches(req, res, next);

    expect(Branch.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockBranch]);
  });
});
