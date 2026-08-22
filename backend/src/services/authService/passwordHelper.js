'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * Generates a random first-time password
 */
function generateFirstTimePassword() {
  // 12-character random hex string (e.g., 'a1b2c3d4e5f6')
  return crypto.randomBytes(6).toString('hex');
}

/**
 * Hashes a plain text password using bcrypt
 */
async function hashPassword(plainTextPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainTextPassword, salt);
}

/**
 * Compares a plain text password with a hash
 */
async function comparePassword(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

module.exports = {
  generateFirstTimePassword,
  hashPassword,
  comparePassword
};
