const { db } = require('./config/database');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

const lines = ['Line A', 'Line B', 'Line C', 'Line D'];
const machines = ['M1', 'M2', 'M3', 'M4', 'M5'];
const problems = [
  'Machine overheating detected',
  'Belt misalignment issue',
  'Sensor malfunction reported',
  'Power fluctuation observed',
  'Material jam in conveyor',
  'Quality issue in final product',
  'Calibration drift detected',
  'Maintenance required urgently',
  'Hydraulic pressure drop',
  'Temperature sensor failure',
  'Motor vibration excessive',
  'Lubrication system fault',
  'Safety guard malfunction',
  'Control panel error',
  'Air pressure insufficient'
];

// Clear existing data
db.prepare('DELETE FROM production_data').run();
db.prepare('DELETE FROM issues').run();

// Generate 365 days of production data
for (let i = 0; i < 365; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const dateStr = date.toISOString().split('T')[0];

  lines.forEach(line => {
    machines.forEach(machine => {
      // Vary production based on day of week and season
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const month = date.getMonth();
      
      // Base production with seasonal and weekly variations
      let baseProduction = 1000;
      if (isWeekend) baseProduction *= 0.7; // Lower weekend production
      if (month >= 5 && month <= 7) baseProduction *= 1.1; // Summer boost
      if (month >= 11 || month <= 1) baseProduction *= 0.9; // Winter reduction
      
      const totalIssued = randomInt(Math.floor(baseProduction * 0.8), Math.floor(baseProduction * 1.2));
      const totalProduction = randomInt(Math.floor(totalIssued * 0.75), totalIssued);
      const defective = randomInt(Math.floor(totalProduction * 0.01), Math.floor(totalProduction * 0.08));
      
      // OEE varies by line and machine
      let baseOEE = 85;
      if (line === 'Line A') baseOEE = 90; // Best performing line
      if (machine === 'M1') baseOEE += 5; // Best machine
      if (machine === 'M5') baseOEE -= 10; // Older machine
      
      const oee = randomFloat(baseOEE - 15, baseOEE + 5);
      const powerUtilize = randomFloat(70, 98);

      db.prepare(`
        INSERT INTO production_data (date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(dateStr, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize);
    });
  });
}

// Generate realistic issues over 365 days
for (let i = 0; i < 150; i++) {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, 365));
  const dateStr = date.toISOString().split('T')[0];
  
  const deadline = new Date(date);
  deadline.setDate(deadline.getDate() + randomInt(1, 21));
  const deadlineStr = deadline.toISOString().split('T')[0];

  const line = lines[randomInt(0, lines.length - 1)];
  const machine = machines[randomInt(0, machines.length - 1)];
  const problem = problems[randomInt(0, problems.length - 1)];
  
  const statuses = ['Pending', 'In Progress', 'Resolved', 'Closed'];
  const weights = [0.2, 0.3, 0.4, 0.1]; // More resolved issues
  const rand = Math.random();
  let status = 'Pending';
  let cumWeight = 0;
  for (let j = 0; j < statuses.length; j++) {
    cumWeight += weights[j];
    if (rand <= cumWeight) {
      status = statuses[j];
      break;
    }
  }
  
  const reporters = ['System Auto', 'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown'];
  const reportedBy = reporters[randomInt(0, reporters.length - 1)];
  
  const resolvedTime = status === 'Resolved' || status === 'Closed' ? 
    `${randomInt(1, 48)} hours` : null;

  db.prepare(`
    INSERT INTO issues (date, line, machine, problem, status, deadline, reportedBy, resolvedTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(dateStr, line, machine, problem, status, deadlineStr, reportedBy, resolvedTime);
}

console.log('✅ Seeded 365 days of production data with realistic variations');
console.log(`📊 Generated ${365 * lines.length * machines.length} production records`);
console.log('🔧 Generated 150 issues with varied statuses');
console.log('🏭 Data includes seasonal variations, weekend patterns, and line-specific performance');
