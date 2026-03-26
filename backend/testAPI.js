const { db } = require('./config/database');

console.log('🔍 Testing API data structure...');

// Test what the API endpoints should return
console.log('\n📋 Pending Users Query:');
const pendingUsers = db.prepare('SELECT id, username, role, name, worker_id, requestedAt FROM users WHERE approved = 0').all();
console.log('Pending users:', pendingUsers);

console.log('\n📋 All Users Query:');
const allUsers = db.prepare('SELECT id, username, role, name, worker_id FROM users WHERE approved = 1').all();
console.log('All users:', allUsers);

console.log('\n📋 Login User Query:');
const loginUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
console.log('Login user data:', {
  id: loginUser?.id,
  username: loginUser?.username,
  role: loginUser?.role,
  name: loginUser?.name,
  worker_id: loginUser?.worker_id
});

db.close();