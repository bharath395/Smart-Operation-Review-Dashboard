const { db } = require('./config/database');

try {
  const result = db.prepare('DELETE FROM issues').run();
  console.log(`✅ Deleted ${result.changes} issues`);
} catch (error) {
  console.error('❌ Error:', error.message);
}
