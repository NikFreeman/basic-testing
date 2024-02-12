// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 100, b: 2, action: Action.Subtract })).toBe(
      98,
    );
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Multiply })).toBe(20);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 45, b: 3, action: Action.Divide })).toBe(15);
    expect(simpleCalculator({ a: 45, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Exponentiate })).toBe(
      25,
    );
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 45, b: 3, action: '' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: '3', b: 3, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 3, b: '3', action: Action.Divide }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '3', b: '3', action: Action.Multiply }),
    ).toBeNull();
  });
});
