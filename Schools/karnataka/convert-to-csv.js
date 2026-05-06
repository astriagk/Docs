const fs = require('fs');
const schools = JSON.parse(fs.readFileSync('./schools.json', 'utf8'));

const header = ['School Name', 'Phone', 'Address'];
const rows = schools.map(s => [
  s['School Name'] ?? '',
  s.Phone ?? '',
  s.Address ?? ''
]);

const csv = [
  header.join(','),
  ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
].join('\n');

fs.writeFileSync('./schools.csv', csv);
console.log('Wrote ./schools.csv');