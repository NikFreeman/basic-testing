import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';
import lodash from 'lodash';

// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  beforeEach(() => {
    bankAccount = getBankAccount(100);
  });
  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => bankAccount.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const targetAccount = new BankAccount(0);
    expect(() => bankAccount.transfer(150, targetAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => bankAccount.transfer(50, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Write your test here
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    bankAccount.withdraw(50);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const targetAccount = new BankAccount(0);
    bankAccount.transfer(50, targetAccount);
    expect(bankAccount.getBalance()).toBe(50);
    expect(targetAccount.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(200);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
