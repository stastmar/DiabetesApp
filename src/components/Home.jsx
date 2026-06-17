import React from 'react';
import Mascot from './Mascot';
import ActivityCard from './ActivityCard';
import FriendLeaderboard from './FriendLeaderboard';

export default function Home({ latest, glucoseData, openMeasurement, activity, friends }) {
  return (
    <div className="home">
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h3>Poslední měření</h3>
            <div style={{fontSize:28,fontWeight:700}}>{latest.toFixed(1)} mmol/L</div>
          </div>
          <div>
            <button onClick={openMeasurement}>+ Přidat</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Vývoj glukózy</h3>
        <div className="chart" style={{height:140}}>
          {/* simple points */}
          {glucoseData.map((v,i)=> (
            <div key={i} className="point" style={{left:`${(i/(glucoseData.length-1))*100}%`,top:`${100-(v/10)*100}%`,background: v<4 || v>8 ? '#ef4444' : '#22c55e'}}/>
          ))}
        </div>
      </div>

      <ActivityCard steps={activity.steps} minutes={activity.minutes} calories={activity.calories} />

      <Mascot>Skvělá práce! Nezapomeň pít vodu a hýbat se.</Mascot>

      <FriendLeaderboard friends={friends} />
    </div>
  )
}
