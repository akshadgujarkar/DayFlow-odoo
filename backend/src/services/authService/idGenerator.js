'use strict';

const { Op } = require('sequelize');
const { Employee } = require('../../models');

/**
 * Generates a Login ID based on the rule:
 * [OI][First2FirstName][First2LastName][YearOfJoining][4-digit serial]
 * e.g., OIJODO20230001
 * 
 * Includes per-year serial increment and collision handling.
 */
async function generateLoginId(firstName, lastName, dateOfJoining) {
  const year = new Date(dateOfJoining).getFullYear().toString();
  
  // Get first 2 chars, pad with X if shorter than 2
  const f = (firstName.substring(0, 2) || '').toUpperCase().padEnd(2, 'X');
  const l = (lastName.substring(0, 2) || '').toUpperCase().padEnd(2, 'X');
  
  // Find all employees that joined in this year to compute the max serial.
  // We can look for login_ids that contain the year before the 4-digit serial.
  const employees = await Employee.findAll({
    where: {
      login_id: {
        [Op.like]: `%${year}____`
      }
    },
    attributes: ['login_id']
  });

  let maxSerial = 0;
  for (const emp of employees) {
    const serialStr = emp.login_id.slice(-4);
    const serial = parseInt(serialStr, 10);
    if (!isNaN(serial) && serial > maxSerial) {
      maxSerial = serial;
    }
  }

  let nextSerial = (maxSerial + 1).toString().padStart(4, '0');
  let loginId = `OI${f}${l}${year}${nextSerial}`;
  
  // Collision handling just in case
  while (await Employee.findOne({ where: { login_id: loginId } })) {
    maxSerial++;
    nextSerial = maxSerial.toString().padStart(4, '0');
    loginId = `OI${f}${l}${year}${nextSerial}`;
  }

  return loginId;
}

module.exports = {
  generateLoginId
};
