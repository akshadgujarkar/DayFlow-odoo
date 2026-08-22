require('dotenv').config();
const { sequelize } = require('./src/models');

async function syncDb() {
  try {
    console.log('Altering database schema...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database altered successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

syncDb();
