import React from 'react';
import Mascot from './Mascot';
import MascotBubble from './MascotBubble';
import ActivityCard from './ActivityCard';
import FriendLeaderboard from './FriendLeaderboard';

export default function Home({ latest, glucoseData, openMeasurement, activity, friends }) {
  return (
    <div className="home">
      <div className="card" style={{position:'relative'}}>
        <MascotBubble message={'Skvělá práce! Pohyb pomáhá tělu využívat energii.'} />
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

      <div className="card" style={{position:'relative'}}>
        <MascotBubble message={'Graf ukazuje vývoj glukózy v čase. Sleduj trendy.'} />
        <h3>Vývoj glukózy</h3>
        <div className="chart" style={{height:140}}>
          {/* simple points */}
          {glucoseData.map((v,i)=> (
            <div key={i} className="point" style={{left:`${(i/(glucoseData.length-1))*100}%`,top:`${100-(v/10)*100}%`,background: v<4 || v>8 ? '#ef4444' : '#22c55e'}}/>
          ))}
        </div>
      </div>

      <div style={{position:'relative'}}>
        <ActivityCard steps={activity.steps} minutes={activity.minutes} calories={activity.calories} />
        <MascotBubble message={'Snaž se každý den být aktivní alespoň 60 minut.'} />
      </div>

      <FriendLeaderboard friends={friends} />
    </div>
  )
}
