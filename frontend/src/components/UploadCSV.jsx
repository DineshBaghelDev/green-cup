import React, {useState} from 'react'

function parseCSV(text){
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h=>h.trim());
  return lines.slice(1).map(l=>{
    const cols = l.split(',').map(c=>c.trim());
    const obj = {};
    headers.forEach((h,i)=> obj[h]=cols[i]);
    return obj;
  })
}

export default function UploadCSV({onData}){
  const [text, setText] = useState('')
  function handleSubmit(e){
    e.preventDefault();
    try{
      const rows = parseCSV(text);
      // Compute simple leaderboard locally using same heuristic as backend
      const computed = rows.map(r=>{
        const electricity = parseFloat(r.electricity_kwh||0);
        const waste = parseFloat(r.waste_segregation_score||0);
        const part = parseFloat(r.participation_points||0);
        const energyScore = Math.max(0, 100 - electricity/10);
        const greenScore = Math.round((0.5*energyScore + 0.3*waste + 0.2*part));
        const carbon = Math.round(electricity * 0.82);
        return {hostel:r.hostel,electricity,waste,participation:part,greenScore,carbon};
      }).sort((a,b)=>b.greenScore-a.greenScore);
      onData(computed);
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div style={{marginTop:10}}>
      <form onSubmit={handleSubmit}>
        <label>Paste CSV (hostel,electricity_kwh,waste_segregation_score,participation_points)</label>
        <br />
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} style={{width:'100%'}} />
        <button type="submit" style={{marginTop:8}}>Parse CSV & Update Leaderboard</button>
      </form>
    </div>
  )
}
