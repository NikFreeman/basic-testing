// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => void {}),
    mockTwo: jest.fn(() => void {}),
    mockThree: jest.fn(() => void {}),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    expect(consoleSpy).not.toHaveBeenCalledWith('foo');
    mockTwo();
    expect(consoleSpy).not.toHaveBeenCalledWith('bar');
    mockThree();
    expect(consoleSpy).not.toHaveBeenCalledWith('baz');
    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
    consoleSpy.mockRestore();
  });
});
