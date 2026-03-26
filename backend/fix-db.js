const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'ba_sprod.db');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('✅ Old database deleted');
} else {
  console.log('ℹ️ No database file found');
}

// Initialize new database
const { initDB } = require('./config/database');
initDB();
console.log('✅ New database created without foreign key constraint');
