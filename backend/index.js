const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = process.env.PORT || 4000;

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
  // Simple heuristic: lower electricity_kwh => higher score
  // and combine waste_segregation_score and participation_points.
  // This is prototype logic and uses rough coefficients.
  return rows.map(r => {
    const electricity = parseFloat(r.electricity_kwh || 0);
    const waste = parseFloat(r.waste_segregation_score || 0);
    const part = parseFloat(r.participation_points || 0);
    // Normalize: use an inverse function for electricity
    const energyScore = Math.max(0, 100 - electricity/10);
    const greenScore = Math.round((0.5*energyScore + 0.3*waste + 0.2*part));
    // Simple carbon estimate (kg CO2) using 0.82 kgCO2/kWh as a rough factor
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

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (parsed.pathname === '/api/sample') {
    const csvPath = path.join(__dirname, 'sample_data', 'hostel_bills.csv');
    fs.readFile(csvPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({error: 'sample data missing'}));
      }
      const rows = parseCSV(data);
      const leaderboard = computeScores(rows);
      res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
      res.end(JSON.stringify({leaderboard}));
    });
    return;
  }
  // Fallback: simple info
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({msg: 'Green Cup backend prototype running'}));
});

server.listen(PORT, () => console.log('Backend listening on', PORT));
