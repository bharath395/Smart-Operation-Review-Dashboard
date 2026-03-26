const bcrypt = require('bcryptjs');
const { db, initDB } = require('./config/database');

initDB();

const seedUsers = () => {
  const users = [
    { username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin', name: 'Administrator', approved: 1 },
    { username: 'manager', password: bcrypt.hashSync('manager123', 10), role: 'manager', name: 'Production Manager', approved: 1 },
    { username: 'supervisor', password: bcrypt.hashSync('supervisor123', 10), role: 'supervisor', name: 'Production Supervisor', approved: 1 },
    { username: 'operator', password: bcrypt.hashSync('operator123', 10), role: 'operator', name: 'Production Operator', approved: 1 }
  ];

  const insert = db.prepare('INSERT INTO users (username, password, role, name, approved) VALUES (?, ?, ?, ?, ?)');
  users.forEach(user => insert.run(user.username, user.password, user.role, user.name, user.approved));
  console.log('✅ Users seeded');
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedProduction = () => {
  const lines = ['Line A', 'Line B', 'Line C', 'Line D', 'Line E', 'Line F'];
  const machines = ['Machine A', 'Machine B', 'Machine C', 'Machine D', 'Machine E', 'Machine F', 'Machine G', 'Machine H'];
  const insert = db.prepare('INSERT INTO production_data (date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  
  let currentDate = new Date('2025-02-01');
  const endDate = new Date('2025-05-25');
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    
    lines.forEach(line => {
      const machine = machines[random(0, machines.length - 1)];
      const totalIssued = random(800, 1200);
      const totalProduction = random(750, totalIssued);
      const defective = random(5, 50);
      const oee = random(75, 95) + Math.random().toFixed(2) * 1;
      const powerUtilize = random(45, 85) + Math.random().toFixed(2) * 1;
      
      insert.run(dateStr, line, machine, totalIssued, totalProduction, defective, parseFloat(oee.toFixed(2)), parseFloat(powerUtilize.toFixed(2)));
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log('✅ Production data seeded');
};

const seedIssues = () => {
  const lines = ['Line A', 'Line B', 'Line C', 'Line D', 'Line E', 'Line F'];
  const machines = ['Machine A', 'Machine B', 'Machine C', 'Machine D', 'Machine E', 'Machine F', 'Machine G', 'Machine H'];
  const problems = [
    'Motor overheating',
    'Belt misalignment',
    'Sensor malfunction',
    'Hydraulic leak',
    'Electrical fault',
    'Bearing noise',
    'Conveyor jam',
    'Control panel error',
    'Pneumatic pressure drop',
    'Lubrication system failure'
  ];
  const statuses = ['Pending', 'In Progress', 'Resolved'];
  const reporters = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'David Wilson'];
  const insert = db.prepare('INSERT INTO issues (date, line, machine, problem, status, deadline, reportedBy, resolvedTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  
  let currentDate = new Date('2025-02-01');
  const endDate = new Date('2025-05-25');
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const issueCount = random(0, 3);
    
    for (let i = 0; i < issueCount; i++) {
      const line = lines[random(0, lines.length - 1)];
      const machine = machines[random(0, machines.length - 1)];
      const problem = problems[random(0, problems.length - 1)];
      const status = statuses[random(0, statuses.length - 1)];
      const reporter = reporters[random(0, reporters.length - 1)];
      const deadlineDate = new Date(currentDate);
      deadlineDate.setDate(deadlineDate.getDate() + random(3, 10));
      const deadline = deadlineDate.toISOString().split('T')[0];
      const resolvedTime = status === 'Resolved' ? `${random(1, 8)} hours` : '-';
      
      insert.run(dateStr, line, machine, problem, status, deadline, reporter, resolvedTime);
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log('✅ Issues seeded');
};

try {
  db.prepare('DELETE FROM production_data').run();
  db.prepare('DELETE FROM issues').run();
  db.prepare('DELETE FROM users').run();
  console.log('✅ Old data cleared');
  
  seedUsers();
  seedProduction();
  seedIssues();
  console.log('✅ Database seeded successfully with data from 2025-02-01 to 2025-05-25');
} catch (error) {
  console.error('❌ Seed error:', error.message);
}
