const bcrypt = require('bcryptjs');
const { db, initDB } = require('./config/database');

// Initialize database first
initDB();

// Create default admin user
const username = 'admin';
const password = 'admin123';
const hashedPassword = bcrypt.hashSync(password, 10);

try {
  // Check if admin user already exists
  const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (existingUser) {
    // Update existing admin user
    db.prepare('UPDATE users SET password = ?, approved = 1 WHERE username = ?')
      .run(hashedPassword, username);
    console.log('✅ Admin user updated');
  } else {
    // Create new admin user
    db.prepare(`
      INSERT INTO users (username, password, role, name, approved) 
      VALUES (?, ?, ?, ?, ?)
    `).run(username, hashedPassword, 'admin', 'Administrator', 1);
    console.log('✅ Admin user created');
  }
  
  console.log('📋 Login credentials:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
  
} catch (error) {
  console.error('Error creating admin user:', error.message);
}