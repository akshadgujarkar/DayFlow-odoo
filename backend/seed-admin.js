require('dotenv').config();
const { Employee, sequelize } = require('./src/models');
const { generateLoginId } = require('./src/services/authService/idGenerator');
const { generateFirstTimePassword, hashPassword } = require('./src/services/authService/passwordHelper');

async function seed() {
  try {
    console.log('Syncing database schema...');
    await sequelize.sync();
    
    const rawPassword = generateFirstTimePassword();
    const hashedPassword = await hashPassword(rawPassword);
    
    const adminData = {
      first_name: 'Admin',
      last_name: 'User',
      date_of_joining: new Date(),
      email: 'admin@dayflow.com',
      role: 'admin',
      password_hash: hashedPassword,
    };
    
    const loginId = await generateLoginId(adminData.first_name, adminData.last_name, adminData.date_of_joining);
    adminData.login_id = loginId;

    await Employee.create(adminData);
    
    console.log('\n=======================================');
    console.log('✅ ADMIN SEEDED SUCCESSFULLY');
    console.log('=======================================');
    console.log('Login ID:', loginId);
    console.log('Email:', adminData.email);
    console.log('Password:', rawPassword);
    console.log('=======================================\n');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin:', err);
    process.exit(1);
  }
}

seed();
