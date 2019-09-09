import * as mockData from '../__tests__/mockData.json';

const axios = {
  get: jest.fn().mockResolvedValue(mockData.raw),
  create: jest.fn(() => jest.genMockFromModule('axios')),
};

module.exports = axios;
