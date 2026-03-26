const { db, initDB } = require('./config/database');

// Initialize database first
initDB();

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
  'Air pressure insufficient',
  'Cooling system failure',
  'Electrical fault detected',
  'Pneumatic system leak'
];

// Clear existing data
db.prepare('DELETE FROM production_data').run();
db.prepare('DELETE FROM issues').run();

// Date range: 01-03-2026 to 10-08-2026
const startDate = new Date('2026-03-01');
const endDate = new Date('2026-08-10');
const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

console.log(`Generating data from ${startDate.toDateString()} to ${endDate.toDateString()}`);
console.log(`Total days: ${totalDays}`);

// Generate production data for each day
for (let i = 0; i < totalDays; i++) {
  const currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + i);
  const dateStr = currentDate.toISOString().split('T')[0];
  
  lines.forEach(line => {
    machines.forEach(machine => {
      // Vary production based on day of week and month
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const month = currentDate.getMonth();
      
      // Base production with variations
      let baseProduction = 1000;
      if (isWeekend) baseProduction *= 0.6; // Lower weekend production
      if (month >= 5 && month <= 7) baseProduction *= 1.15; // Summer boost (June-August)
      if (month >= 2 && month <= 4) baseProduction *= 1.05; // Spring increase (March-May)
      
      const totalIssued = randomInt(Math.floor(baseProduction * 0.85), Math.floor(baseProduction * 1.25));
      const totalProduction = randomInt(Math.floor(totalIssued * 0.78), totalIssued);
      const defective = randomInt(Math.floor(totalProduction * 0.005), Math.floor(totalProduction * 0.075));
      
      // OEE varies by line and machine with realistic ranges
      let baseOEE = 82;
      if (line === 'Line A') baseOEE = 88; // Best performing line
      if (line === 'Line B') baseOEE = 85;
      if (line === 'Line C') baseOEE = 80;
      if (line === 'Line D') baseOEE = 78; // Oldest line
      
      if (machine === 'M1') baseOEE += 6; // Best machine
      if (machine === 'M2') baseOEE += 3;
      if (machine === 'M3') baseOEE += 1;
      if (machine === 'M4') baseOEE -= 2;
      if (machine === 'M5') baseOEE -= 8; // Oldest machine
      
      const oee = Math.max(65, Math.min(95, randomFloat(baseOEE - 12, baseOEE + 8)));
      const powerUtilize = randomFloat(72, 96);

      db.prepare(`
        INSERT INTO production_data (date, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(dateStr, line, machine, totalIssued, totalProduction, defective, oee, powerUtilize);
    });
  });
}

// Generate realistic issues throughout the date range
const totalIssues = Math.floor(totalDays * 0.8); // About 0.8 issues per day on average

for (let i = 0; i < totalIssues; i++) {
  // Random date within the range
  const randomDayOffset = randomInt(0, totalDays - 1);
  const issueDate = new Date(startDate);
  issueDate.setDate(startDate.getDate() + randomDayOffset);
  const dateStr = issueDate.toISOString().split('T')[0];
  
  // Deadline 1-15 days after issue date
  const deadline = new Date(issueDate);
  deadline.setDate(issueDate.getDate() + randomInt(1, 15));
  const deadlineStr = deadline.toISOString().split('T')[0];

  const line = lines[randomInt(0, lines.length - 1)];
  const machine = machines[randomInt(0, machines.length - 1)];
  const problem = problems[randomInt(0, problems.length - 1)];
  
  // Realistic status distribution
  const statuses = ['Pending', 'In Progress', 'Resolved', 'Closed'];
  const weights = [0.15, 0.25, 0.45, 0.15]; // Most issues are resolved
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
  
  const reporters = ['System Auto', 'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown', 'David Chen', 'Emma Davis', 'Alex Rodriguez'];
  const reportedBy = reporters[randomInt(0, reporters.length - 1)];
  
  const resolvedTime = (status === 'Resolved' || status === 'Closed') ? 
    `${randomInt(2, 72)} hours` : null;

  db.prepare(`
    INSERT INTO issues (date, line, machine, problem, status, deadline, reportedBy, resolvedTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(dateStr, line, machine, problem, status, deadlineStr, reportedBy, resolvedTime);
}

const productionRecords = totalDays * lines.length * machines.length;
console.log(`✅ Generated ${productionRecords} production records`);
console.log(`✅ Generated ${totalIssues} issues`);
console.log('📊 Data includes:');
console.log('   - Weekend production variations');
console.log('   - Seasonal patterns (Spring/Summer boost)');
console.log('   - Line-specific performance differences');
console.log('   - Machine-specific OEE variations');
console.log('   - Realistic defect rates (0.5-7.5%)');
console.log('   - Varied issue statuses and resolution times');
console.log('🎯 Date range: March 1, 2026 to August 10, 2026');