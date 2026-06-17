import React from 'react';

export default function ActivityCard({ steps, minutes, calories }) {
  return (
    <div className="card">
      <h3>Denní aktivita</h3>
      <div style={{display:'flex',gap:12}}>
        <div>
          <div style={{fontSize:20,fontWeight:700}}>{steps}</div>
          <div style={{fontSize:12,opacity:0.7}}>kroků</div>
        </div>
        <div>
          <div style={{fontSize:20,fontWeight:700}}>{minutes}</div>
          <div style={{fontSize:12,opacity:0.7}}>minut pohybu</div>
        </div>
        <div>
          <div style={{fontSize:20,fontWeight:700}}>{calories}</div>
          <div style={{fontSize:12,opacity:0.7}}>spálené kcal</div>
        </div>
      </div>
    </div>
  )
}
