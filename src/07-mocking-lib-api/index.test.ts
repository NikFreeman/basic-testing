// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const config = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };
  const relativePath = '/post';
  const expectedResponse = { data: 'Response data' };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    axios.create = jest.fn().mockImplementation(() => ({
      get: () => Promise.resolve(config),
    }));
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axios.create).toBeCalledWith(expect.objectContaining(config));
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const getter = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedResponse));
    axios.create = jest.fn().mockImplementation(() => ({
      get: getter,
    }));

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(getter).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Write your test here

    jest.runAllTimers();
    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(expectedResponse);

    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toEqual(expectedResponse.data);
  });
});
