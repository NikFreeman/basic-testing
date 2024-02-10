// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const setTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const setTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const setInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    const interval = 1000;
    const executionCount = 5;

    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval - 1);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(interval * executionCount);
    expect(callback).toHaveBeenCalledTimes(executionCount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const joinMock = jest.spyOn(path, 'join').mockImplementation();
    await readFileAsynchronously('test.txt');
    expect(joinMock).toBeCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      return false;
    });
    const fileContent = await readFileAsynchronously('nonexistent.txt');
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const mockFileContent = 'File content';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      return true;
    });

    jest.spyOn(fsPromises, 'readFile').mockImplementation(() => {
      return Promise.resolve(mockFileContent);
    });
    const fileContent = await readFileAsynchronously('test.txt');
    expect(fileContent).toBe(mockFileContent);
  });
});
