const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!user.approved) {
    return res.status(403).json({ message: 'Account pending approval from admin' });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      worker_id: user.worker_id
    }
  });
});

router.post('/signup', (req, res) => {
  const { username, password, name, role, worker_id } = req.body;

  const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const existingWorkerId = db.prepare('SELECT * FROM users WHERE worker_id = ?').get(worker_id);
  
  if (existingWorkerId) {
    return res.status(400).json({ message: 'Worker ID already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (username, password, role, name, worker_id, approved) VALUES (?, ?, ?, ?, ?, 0)')
    .run(username, hashedPassword, role || 'operator', name, worker_id);

  res.status(201).json({ message: 'Registration submitted. Waiting for admin approval.' });
});

router.get('/pending-users', authMiddleware, adminMiddleware, (req, res) => {
  const userRole = req.user.role;
  
  let query = 'SELECT id, username, role, name, worker_id, requestedAt FROM users WHERE approved = 0';
  
  if (userRole === 'manager') {
    query += " AND (role = 'supervisor' OR role = 'operator')";
  }
  
  const pendingUsers = db.prepare(query).all();
  res.json(pendingUsers);
});

router.get('/all-users', authMiddleware, adminMiddleware, (req, res) => {
  const userRole = req.user.role;
  
  let query = 'SELECT id, username, role, name, worker_id FROM users WHERE approved = 1';
  
  if (userRole === 'admin') {
    query += " AND role != 'admin'";
  } else if (userRole === 'manager') {
    query += " AND (role = 'supervisor' OR role = 'operator')";
  }
  
  query += " ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'manager' THEN 2 WHEN 'supervisor' THEN 3 WHEN 'operator' THEN 4 END";
  
  const users = db.prepare(query).all();
  res.json(users);
});

router.post('/approve-user/:id', authMiddleware, adminMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  
  const result = db.prepare('UPDATE users SET approved = 1 WHERE id = ? AND approved = 0').run(id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({ message: 'User approved successfully' });
});

router.delete('/reject-user/:id', authMiddleware, adminMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  
  const result = db.prepare('DELETE FROM users WHERE id = ? AND approved = 0').run(id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({ message: 'User rejected successfully' });
});

router.delete('/delete-user/:id', authMiddleware, adminMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const userRole = req.user.role;
  
  const targetUser = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
  
  if (!targetUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (userRole === 'manager' && (targetUser.role === 'admin' || targetUser.role === 'manager')) {
    return res.status(403).json({ message: 'Cannot delete admin or manager users' });
  }
  
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  res.json({ message: 'User deleted successfully' });
});

router.get('/notifications', authMiddleware, adminMiddleware, (req, res) => {
  const notifications = [];
  
  const pendingCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE approved = 0').get().count;
  if (pendingCount > 0) {
    notifications.push({
      type: 'user_approval',
      count: pendingCount,
      message: `${pendingCount} user(s) pending approval`
    });
  }
  
  const today = new Date().toISOString().split('T')[0];
  const overdueCount = db.prepare("SELECT COUNT(*) as count FROM issues WHERE (status = 'Pending' OR status = 'In Progress') AND deadline < ?").get(today).count;
  
  if (overdueCount > 0) {
    notifications.push({
      type: 'overdue_issues',
      count: overdueCount,
      message: `${overdueCount} issue(s) overdue`
    });
  }
  
  res.json(notifications);
});

router.put('/profile', authMiddleware, (req, res) => {
  const { name } = req.body;
  db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, req.user.id);
  res.json({ message: 'Profile updated' });
});

router.put('/password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.user.id);
  res.json({ message: 'Password changed' });
});

module.exports = router;
