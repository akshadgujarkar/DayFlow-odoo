require('dotenv').config();
const { Employee } = require('./src/models');
const { hashPassword } = require('./src/services/authService/passwordHelper');

async function resetAdminPassword() {
  try {
    const admin = await Employee.findOne({ where: { email: 'admin@dayflow.com' } });
    if (!admin) {
      console.log('Admin not found!');
      process.exit(1);
    }
    
    const newPassword = 'password123';
    admin.password_hash = await hashPassword(newPassword);
    await admin.save();
    
    console.log('✅ Password successfully reset to: password123');
    console.log('Login ID:', admin.login_id);
    console.log('Email:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAdminPassword();
