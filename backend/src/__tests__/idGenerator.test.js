'use strict';

const { generateLoginId } = require('../services/authService/idGenerator');
const { Employee } = require('../models');

jest.mock('../models', () => ({
  Employee: {
    findAll: jest.fn(),
    findOne: jest.fn()
  }
}));

describe('generateLoginId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates a valid Login ID for a new year', async () => {
    Employee.findAll.mockResolvedValue([]);
    Employee.findOne.mockResolvedValue(null);

    const loginId = await generateLoginId('John', 'Doe', '2023-05-10');
    expect(loginId).toBe('OIJODO20230001');
  });

  it('pads short names with X', async () => {
    Employee.findAll.mockResolvedValue([]);
    Employee.findOne.mockResolvedValue(null);

    const loginId = await generateLoginId('J', 'D', '2022-01-01');
    expect(loginId).toBe('OIJXDX20220001');
  });

  it('increments the serial correctly based on max serial in the year', async () => {
    Employee.findAll.mockResolvedValue([
      { login_id: 'OIJODO20230001' },
      { login_id: 'OIABCD20230015' }
    ]);
    Employee.findOne.mockResolvedValue(null);

    const loginId = await generateLoginId('Alice', 'Smith', '2023-08-20');
    expect(loginId).toBe('OIALSM20230016');
  });
});
