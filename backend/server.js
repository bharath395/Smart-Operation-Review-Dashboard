require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { db, initDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productionRoutes = require('./routes/productionRoutes');
const issueRoutes = require('./routes/issueRoutes');
const { sendDeadlineAlert } = require('./services/emailService');

const app = express();

// Initialize database
initDB();

// Update existing users without worker_id
const updateExistingUsers = () => {
  try {
    const usersWithoutWorkerId = db.prepare("SELECT id FROM users WHERE worker_id IS NULL OR worker_id = ''").all();
    
    usersWithoutWorkerId.forEach(user => {
      const randomWorkerId = Math.floor(100000 + Math.random() * 900000).toString();
      db.prepare('UPDATE users SET worker_id = ? WHERE id = ?').run(randomWorkerId, user.id);
      console.log(`Updated user ${user.id} with worker_id: ${randomWorkerId}`);
    });
    
    if (usersWithoutWorkerId.length > 0) {
      console.log(`✅ Updated ${usersWithoutWorkerId.length} existing users with random Worker IDs`);
    }
  } catch (error) {
    console.error('Error updating existing users:', error);
  }
};

// Run the update after database initialization
setTimeout(updateExistingUsers, 1000);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'BA Productions API Server' });
});

// Check for overdue issues every hour
cron.schedule('0 * * * *', () => {
  console.log('Checking for overdue issues...');
  const today = new Date().toISOString().split('T')[0];
  
  const overdueIssues = db.prepare("SELECT * FROM issues WHERE (status = 'Pending' OR status = 'In Progress') AND deadline < ?").all(today);
  
  overdueIssues.forEach(issue => {
    console.log(`Overdue issue found: #${issue.id} - ${issue.problem}`);
    sendDeadlineAlert(issue);
  });
});

// Check immediately on server start
setTimeout(() => {
  console.log('Running initial overdue check...');
  const today = new Date().toISOString().split('T')[0];
  
  const overdueIssues = db.prepare("SELECT * FROM issues WHERE (status = 'Pending' OR status = 'In Progress') AND deadline < ?").all(today);
  
  overdueIssues.forEach(issue => {
    console.log(`Overdue issue found: #${issue.id} - ${issue.problem}`);
    sendDeadlineAlert(issue);
  });
}, 5000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Email alert system active - checking for overdue issues every hour');
  console.log(`Email sender: ${process.env.EMAIL_USER}`);
  console.log(`Email receiver: ${process.env.ADMIN_EMAIL}`);
});
