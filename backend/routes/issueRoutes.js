const express = require('express');
const { db } = require('../config/database');
const { authMiddleware, managerMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  const issues = db.prepare('SELECT * FROM issues').all();
  res.json(issues);
});

router.post('/', authMiddleware, managerMiddleware, (req, res) => {
  const { date, line, machine, problem, status, deadline, reportedBy, resolvedTime } = req.body;
  
  try {
    const result = db.prepare('INSERT INTO issues (date, line, machine, problem, status, deadline, reportedBy, resolvedTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(date, line, machine, problem, status || 'Pending', deadline, reportedBy, resolvedTime || '-');
    
    const newIssue = db.prepare('SELECT * FROM issues WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, managerMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const { date, line, machine, problem, status, deadline, reportedBy, resolvedTime } = req.body;
  
  try {
    const result = db.prepare('UPDATE issues SET date = ?, line = ?, machine = ?, problem = ?, status = ?, deadline = ?, reportedBy = ?, resolvedTime = ? WHERE id = ?')
      .run(date, line, machine, problem, status, deadline, reportedBy, resolvedTime || '-', id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const updatedIssue = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
    res.json(updatedIssue);
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, managerMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  
  const result = db.prepare('DELETE FROM issues WHERE id = ?').run(id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  res.json({ message: 'Issue deleted successfully' });
});

module.exports = router;
