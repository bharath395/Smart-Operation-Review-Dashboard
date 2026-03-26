const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'ba_sprod.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
const initDB = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'operator',
      name VARCHAR(100) NOT NULL,
      worker_id VARCHAR(20) UNIQUE,
      approved BOOLEAN DEFAULT 0,
      requestedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Production data table
  db.exec(`
    CREATE TABLE IF NOT EXISTS production_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      line VARCHAR(20) NOT NULL,
      machine VARCHAR(20) NOT NULL,
      totalIssued INTEGER NOT NULL,
      totalProduction INTEGER NOT NULL,
      defective INTEGER NOT NULL,
      oee DECIMAL(5,2) NOT NULL,
      powerUtilize DECIMAL(5,2) NOT NULL
    )
  `);

  // Issues table
  db.exec(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      line VARCHAR(20) NOT NULL,
      machine VARCHAR(20) NOT NULL,
      problem TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'Pending',
      deadline DATE NOT NULL,
      reportedBy VARCHAR(50),
      resolvedTime VARCHAR(50)
    )
  `);

  console.log('✅ Database schema initialized');
};

module.exports = { db, initDB };
