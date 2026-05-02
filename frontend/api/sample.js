const fs = require('fs').promises;
const path = require('path');

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(l => {
    const cols = l.split(',').map(c => c.trim());
    const obj = {};
    headers.forEach((h,i) => { obj[h] = cols[i]; });
    return obj;
  });
}

function computeScores(rows) {
  return rows.map(r => {
    const electricity = parseFloat(r.electricity_kwh || 0);
    const waste = parseFloat(r.waste_segregation_score || 0);
    const part = parseFloat(r.participation_points || 0);
    const energyScore = Math.max(0, 100 - electricity/10);
    const greenScore = Math.round((0.5*energyScore + 0.3*waste + 0.2*part));
    const carbon = Math.round(electricity * 0.82);
    return {
      hostel: r.hostel,
      electricity,
      waste,
      participation: part,
      greenScore,
      carbon
    };
  }).sort((a,b) => b.greenScore - a.greenScore);
}

module.exports = async (req, res) => {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'sample_data', 'hostel_bills.csv');
    const data = await fs.readFile(csvPath, 'utf8');
    const rows = parseCSV(data);
    const leaderboard = computeScores(rows);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ leaderboard }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'sample data missing' }));
  }
};