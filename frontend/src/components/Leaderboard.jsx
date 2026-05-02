import React from 'react'

export default function Leaderboard({rows}){
  if(!rows) return <div>Loading leaderboard (or fetch failed).</div>
  return (
    <div style={{marginTop:20}}>
      <h2>Hostel Rankings</h2>
      <table style={{borderCollapse:'collapse',width:'100%'}}>
        <thead>
          <tr>
            <th style={{textAlign:'left'}}>Rank</th>
            <th style={{textAlign:'left'}}>Hostel</th>
            <th>Green Score</th>
            <th>Electricity (kWh)</th>
            <th>Estimated CO₂ (kg)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=> (
            <tr key={r.hostel}>
              <td>{i+1}</td>
              <td>{r.hostel}</td>
              <td>{r.greenScore}</td>
              <td>{r.electricity}</td>
              <td>{r.carbon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
