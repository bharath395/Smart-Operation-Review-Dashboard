const { db, initDB } = require('./config/database');

// Initialize database first
initDB();

// Clear all data from tables
try {
  const productionCount = db.prepare('SELECT COUNT(*) as count FROM production_data').get().count;
  const issuesCount = db.prepare('SELECT COUNT(*) as count FROM issues').get().count;
  
  db.prepare('DELETE FROM production_data').run();
  db.prepare('DELETE FROM issues').run();
  
  console.log(`🗑️ Cleared ${productionCount} production records`);
  console.log(`🗑️ Cleared ${issuesCount} issues`);
  console.log('✅ Database cleared successfully');
} catch (error) {
  console.error('Error clearing data:', error.message);
}