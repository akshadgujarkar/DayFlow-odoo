'use strict';

const { generateFirstTimePassword, hashPassword, comparePassword } = require('../services/authService/passwordHelper');

describe('passwordHelper', () => {
  it('generates a random first-time password', () => {
    const pwd1 = generateFirstTimePassword();
    const pwd2 = generateFirstTimePassword();
    expect(pwd1.length).toBe(12); // 6 bytes * 2
    expect(pwd2.length).toBe(12);
    expect(pwd1).not.toBe(pwd2);
  });

  it('hashes and compares a password successfully', async () => {
    const plain = 'mysecretpassword';
    const hash = await hashPassword(plain);
    
    expect(hash).not.toBe(plain);
    
    const isMatch = await comparePassword(plain, hash);
    expect(isMatch).toBe(true);
    
    const isFalseMatch = await comparePassword('wrongpassword', hash);
    expect(isFalseMatch).toBe(false);
  });
});
