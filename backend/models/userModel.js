const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    name: 'Administrator',
    approved: true
  },
  {
    id: 2,
    username: 'operator',
    password: bcrypt.hashSync('operator123', 10),
    role: 'operator',
    name: 'Production Operator',
    approved: true
  },
  {
    id: 3,
    username: 'manager',
    password: bcrypt.hashSync('manager123', 10),
    role: 'manager',
    name: 'Production Manager',
    approved: true
  },
  {
    id: 4,
    username: 'supervisor',
    password: bcrypt.hashSync('supervisor123', 10),
    role: 'supervisor',
    name: 'Production Supervisor',
    approved: true
  }
];

const pendingUsers = [];

module.exports = { users, pendingUsers };
