const express = require('express');
const { db } = require('../config/database');
const { authMiddleware, managerMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  const { date } = req.query;
  
  let query = 'SELECT * FROM production_data';
  let params = [];
  
  if (date) {
    query += ' WHERE date = ?';
    params.push(date);
  }
  
  const data = db.prepare(query).all(...params);
  
  const summary = {
    totalIssued: data.reduce((sum, item) => sum + item.totalIssued, 0),
    totalProduction: data.reduce((sum, item) => sum + item.totalProduction, 0),
    totalDefective: data.reduce((sum, item) => sum + item.defective, 0),
    defectiveRate: 0,
    avgOEE: 0,
    avgPowerUtilize: 0,
    data
  };

  summary.defectiveRate = data.length > 0 ? ((summary.totalDefective / summary.totalProduction) * 100).toFixed(2) : 0;
  summary.avgOEE = data.length > 0 ? (data.reduce((sum, item) => sum + item.oee, 0) / data.length).toFixed(2) : 0;
  summary.avgPowerUtilize = data.length > 0 ? (data.reduce((sum, item) => sum + item.powerUtilize, 0) / data.length).toFixed(2) : 0;

  res.json(summary);
});

router.post('/', authMiddleware, managerMiddleware, (req, res) => {
  const { date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize } = req.body;
  
  const result = db.prepare('INSERT INTO production_data (date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize);
  
  const newData = db.prepare('SELECT * FROM production_data WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newData);
});

router.put('/:id', authMiddleware, managerMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const { date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize } = req.body;
  
  const result = db.prepare('UPDATE production_data SET date = ?, line = ?, machine = ?, totalIssued = ?, totalProduction = ?, defective = ?, oee = ?, powerUtilize = ? WHERE id = ?')
    .run(date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize, id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Data not found' });
  }

  const updatedData = db.prepare('SELECT * FROM production_data WHERE id = ?').get(id);
  res.json(updatedData);
});

router.delete('/:id', authMiddleware, managerMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  
  const result = db.prepare('DELETE FROM production_data WHERE id = ?').run(id);
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Data not found' });
  }

  res.json({ message: 'Data deleted successfully' });
});

module.exports = router;
